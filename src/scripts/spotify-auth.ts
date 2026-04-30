/**
 * CLI script for local Spotify authentication.
 * @remarks
 * Provides a standalone script to manually authenticate with Spotify and retrieve initial OAuth tokens during development or setup.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
/**
 * Standalone script to obtain a Spotify refresh token.
 */
import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

if (!clientId || !clientSecret || !redirectUri) {
  console.error(
    'Missing required Spotify configuration (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI) in .env',
  );
  process.exit(1);
}

const scopes = 'user-read-currently-playing user-read-playback-state';

app.get('/login', (req, res) => {
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
    scopes,
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    res.send('Error: Authorization code missing.');
    return;
  }

  try {
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
      },
    );

    const refreshToken = response.data.refresh_token;

    console.log('\n\n=========================================');
    console.log('SUCCESS! Add the following to your .env file:');
    console.log(`SPOTIFY_REFRESH_TOKEN=${refreshToken}`);
    console.log('=========================================\n\n');

    res.send('Success! You can close this window and check your terminal.');

    // Shut down gracefully
    setTimeout(() => process.exit(0), 1000);
  } catch (error: unknown) {
    const err = error as Error & { response?: { data?: unknown } };
    console.error('Error fetching token:', err.response?.data || err.message);
    res.send('An error occurred. Check the terminal for details.');
  }
});

app.listen(port, () => {
  console.log(
    `Auth server running. Please visit http://localhost:${port}/login to authenticate with Spotify.`,
  );
});
