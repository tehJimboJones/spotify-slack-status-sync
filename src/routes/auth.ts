import { Router, Request, Response } from 'express';
import axios from 'axios';
import { AppConfig } from '../config';
import { IUserService } from '../user';
import * as crypto from 'crypto';

interface SessionData {
  slackUserId: string;
  slackUserToken: string;
}

// In-memory cache to store session data between Slack OAuth and Spotify OAuth.
// In a production environment, this should be backed by Redis or a database.
const sessionCache = new Map<string, SessionData>();

export function createAuthRouter(config: AppConfig, userService: IUserService): Router {
  const router = Router();

  /**
   * Step 1: Start the chained OAuth flow.
   * Redirects the user to Slack to authorize the app.
   */
  router.get('/start', (req: Request, res: Response) => {
    const slackUserId = req.query.userId as string;
    if (!slackUserId) {
      res.status(400).send('Missing userId parameter.');
      return;
    }

    const redirectUri = `${config.bot.baseUrl}/auth/slack/callback`;
    const slackAuthUrl = new URL('https://slack.com/oauth/v2/authorize');
    slackAuthUrl.searchParams.append('client_id', config.slack.clientId);
    slackAuthUrl.searchParams.append('user_scope', 'users.profile:write');
    slackAuthUrl.searchParams.append('redirect_uri', redirectUri);
    // Pass the slackUserId through the state so we have it later if needed,
    // although Slack's response also gives us the authed_user.id
    slackAuthUrl.searchParams.append('state', slackUserId);

    res.redirect(slackAuthUrl.toString());
  });

  /**
   * Step 2: Slack OAuth Callback.
   * Receives the code from Slack, exchanges it for a user token, caches it,
   * and redirects to Spotify for the next auth step.
   */
  router.get('/slack/callback', async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const error = req.query.error as string;
    const stateSlackUserId = req.query.state as string;

    if (error) {
      res.status(400).send(`Slack authorization failed: ${error}`);
      return;
    }

    if (!code) {
      res.status(400).send('Missing code parameter.');
      return;
    }

    try {
      const redirectUri = `${config.bot.baseUrl}/auth/slack/callback`;
      const response = await axios.post(
        'https://slack.com/api/oauth.v2.access',
        new URLSearchParams({
          client_id: config.slack.clientId,
          client_secret: config.slack.clientSecret,
          code,
          redirect_uri: redirectUri,
        }).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      const data = response.data;
      if (!data.ok) {
        throw new Error(data.error || 'Unknown Slack OAuth error');
      }

      // authed_user contains the user token and ID
      const slackUserId = data.authed_user?.id || stateSlackUserId;
      const slackUserToken = data.authed_user?.access_token;

      if (!slackUserId || !slackUserToken) {
        throw new Error('Failed to obtain user token or ID from Slack.');
      }

      // Generate a secure session ID
      const sessionId = crypto.randomBytes(16).toString('hex');
      sessionCache.set(sessionId, { slackUserId, slackUserToken });

      // Redirect to Spotify OAuth
      const spotifyAuthUrl = new URL('https://accounts.spotify.com/authorize');
      spotifyAuthUrl.searchParams.append('client_id', config.spotify.clientId);
      spotifyAuthUrl.searchParams.append('response_type', 'code');
      spotifyAuthUrl.searchParams.append('redirect_uri', config.spotify.redirectUri);
      spotifyAuthUrl.searchParams.append('scope', 'user-read-currently-playing');
      spotifyAuthUrl.searchParams.append('state', sessionId);

      res.redirect(spotifyAuthUrl.toString());
    } catch (err: unknown) {
      console.error('Error in Slack OAuth callback:', err instanceof Error ? err.message : err);
      res.status(500).send('Internal server error during Slack authentication.');
    }
  });

  /**
   * Step 3: Spotify OAuth Callback.
   * Receives the code from Spotify, exchanges it for a refresh token,
   * retrieves the cached Slack token, and saves both to the database.
   */
  router.get('/spotify/callback', async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const error = req.query.error as string;
    const sessionId = req.query.state as string;

    if (error) {
      res.status(400).send(`Spotify authorization failed: ${error}`);
      return;
    }

    if (!code || !sessionId) {
      res.status(400).send('Missing code or state parameter.');
      return;
    }

    const sessionData = sessionCache.get(sessionId);
    if (!sessionData) {
      res.status(400).send('Session expired or invalid state parameter.');
      return;
    }

    // Clear the cache to prevent reuse
    sessionCache.delete(sessionId);

    try {
      const authHeader = Buffer.from(
        `${config.spotify.clientId}:${config.spotify.clientSecret}`,
      ).toString('base64');

      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: config.spotify.redirectUri,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authHeader}`,
          },
        },
      );

      const data = response.data;
      const spotifyRefreshToken = data.refresh_token;

      if (!spotifyRefreshToken) {
        throw new Error('No refresh token received from Spotify. Did you revoke access?');
      }

      // Upsert user into database
      await userService.upsertUser(sessionData.slackUserId, {
        slackUserToken: sessionData.slackUserToken,
        spotifyRefreshToken: spotifyRefreshToken,
        isSyncActive: true, // Default to active upon login
      });

      res.send(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>🎉 Authentication Successful!</h2>
            <p>Your Slack and Spotify accounts are now linked.</p>
            <p>You can close this window and return to Slack.</p>
          </body>
        </html>
      `);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: unknown } };
      console.error(
        'Error in Spotify OAuth callback:',
        axiosErr.response?.data || (err instanceof Error ? err.message : err),
      );
      res.status(500).send('Internal server error during Spotify authentication.');
    }
  });

  return router;
}
