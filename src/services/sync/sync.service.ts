/**
 * Status synchronization orchestrator.
 * @remarks
 * Manages the core business logic of polling Spotify for currently playing media and pushing status updates to the user's Slack profile.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { IConfigService } from '../config/types';
import { ISpotifyService } from '../spotify/types';
import { ISlackService } from '../slack/types';
import { IUserService } from '../user/types';
import { ISyncService } from './types';
import { SlackStatusSetError } from '../slack/errors';
import { SpotifyTokenRefreshError, SpotifyCurrentlyPlayingError } from '../spotify/errors';

/**
 * Orchestrates Spotify-to-Slack status synchronization.
 *
 * @remarks
 * Polls the Spotify API for active users and updates their Slack profile status accordingly. Manages its own background loop and error isolation per user.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SyncService([SyncService]) -->|Implements| ISyncService[ISyncService]
 * SyncService -->|Uses| IUserService[IUserService]
 * SyncService -->|Uses| ISpotifyService[ISpotifyService]
 * SyncService -->|Uses| ISlackService[ISlackService]
 * Client[App Bootstrap] -.->|Instantiates| SyncService
 * ```
 *
 * @example
 * ```typescript
 * const syncService = new SyncService(userService, spotifyService, slackService);
 * ```
 *
 * @public
 */
export class SyncService implements ISyncService {
  private timer: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private userStates: Map<string, string> = new Map();

  constructor(
    private spotify: ISpotifyService,
    private slack: ISlackService,
    private userService: IUserService,
    private configService: IConfigService,
  ) {}

  public start(): void {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    console.log(
      `SyncService started. Polling every ${this.configService.getBotConfig().pollIntervalMs}ms.`,
    );
    this.runLoop();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    console.log('SyncService stopped.');
  }

  private async runLoop(): Promise<void> {
    if (!this.isRunning) return;

    await this.syncNow();

    if (this.isRunning) {
      this.timer = setTimeout(
        () => this.runLoop(),
        this.configService.getBotConfig().pollIntervalMs,
      );
    }
  }

  public async syncNow(): Promise<void> {
    try {
      const activeUsers = await this.userService.getActiveUsers();

      for (const user of activeUsers) {
        try {
          const track = await this.spotify.getCurrentlyPlaying(user);
          const stateStr = track
            ? `${track.isPlaying ? 'playing' : 'paused'}:${track.type || 'track'}:${track.songName}:${track.artistName}`
            : '';

          const lastStateStr = this.userStates.get(user.id) ?? null;

          if (stateStr !== lastStateStr) {
            if (track) {
              if (track.type === 'episode' && !user.syncPodcasts) {
                try {
                  await this.slack.clearStatus(user);
                } catch (error) {
                  console.error(`Error clearing status for ${user.slackUserId}:`, error);
                }
              } else {
                const isEpisode = track.type === 'episode';

                let emoji: string;
                if (isEpisode) {
                  emoji = track.isPlaying ? user.podcastStatusEmoji : user.podcastPausedEmoji;
                } else {
                  emoji = track.isPlaying ? user.statusEmoji : user.pausedEmoji;
                }

                let statusText = isEpisode ? user.podcastStatusFormat : user.statusFormat;

                if (isEpisode) {
                  if (track.artistName)
                    statusText = statusText.replace('{podcast name}', track.artistName);
                  if (track.songName)
                    statusText = statusText.replace('{episode title}', track.songName);
                } else {
                  if (track.songName) statusText = statusText.replace('{song}', track.songName);
                  if (track.artistName)
                    statusText = statusText.replace('{artist}', track.artistName);
                }

                try {
                  await this.slack.setStatus(user, statusText, emoji);
                } catch (error) {
                  if (error instanceof SlackStatusSetError) {
                    console.warn(
                      `Failed to update Slack status for ${user.slackUserId} with emoji "${emoji}". Retrying with default emoji...`,
                      error.message,
                    );

                    let defaultEmoji: string;
                    if (isEpisode) {
                      defaultEmoji = track.isPlaying ? ':microphone:' : ':double_vertical_bar:';
                    } else {
                      const botConfig = this.configService.getBotConfig();
                      defaultEmoji = track.isPlaying
                        ? botConfig.statusEmoji
                        : botConfig.pausedEmoji;
                    }

                    try {
                      await this.slack.setStatus(user, statusText, defaultEmoji);
                      console.log(
                        `Successfully updated Slack status for ${user.slackUserId} using fallback emoji.`,
                      );
                    } catch (fallbackError) {
                      console.error(
                        `Failed to update Slack status for ${user.slackUserId} even with fallback emoji:`,
                        fallbackError instanceof Error ? fallbackError.message : fallbackError,
                      );
                    }
                  } else {
                    console.error(
                      `Unexpected error updating status for ${user.slackUserId}:`,
                      error,
                    );
                  }
                }
              }
            } else {
              try {
                await this.slack.clearStatus(user);
              } catch (error) {
                console.error(`Error clearing status for ${user.slackUserId}:`, error);
              }
            }
            this.userStates.set(user.id, stateStr);
          }
        } catch (error) {
          if (
            error instanceof SpotifyTokenRefreshError ||
            error instanceof SpotifyCurrentlyPlayingError
          ) {
            console.error(`Spotify sync failed for user ${user.slackUserId}:`, error.message);
          } else {
            console.error(`Unexpected error during sync for user ${user.slackUserId}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error during sync:', error);
    }
  }
}
