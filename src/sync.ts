/**
 * Synchronization service module.
 * Orchestrates the polling of Spotify and updating of Slack.
 */
import { AppConfig } from './config';
import { ISpotifyService } from './spotify';
import { ISlackService } from './slack';
import { IUserService } from './user';

/**
 * Interface defining the operations for the synchronization service.
 */
export interface ISyncService {
  /** Starts the synchronization polling loop. */
  start(): void;
  /** Stops the synchronization polling loop. */
  stop(): void;
  /** Performs an immediate synchronization check. */
  syncNow(): Promise<void>;
}

/**
 * Service responsible for syncing Spotify playback state to Slack status.
 */
export class SyncService implements ISyncService {
  private timer: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private userStates: Map<string, string> = new Map();

  /**
   * Constructs a new SyncService.
   *
   * @param spotify - The Spotify service.
   * @param slack - The Slack service.
   * @param userService - The User service.
   * @param config - The application configuration.
   */
  constructor(
    private spotify: ISpotifyService,
    private slack: ISlackService,
    private userService: IUserService,
    private config: AppConfig,
  ) {}

  /**
   * Starts the polling loop to continuously synchronize state.
   */
  public start(): void {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    console.log(`SyncService started. Polling every ${this.config.bot.pollIntervalMs}ms.`);
    this.runLoop();
  }

  /**
   * Stops the polling loop.
   */
  public stop(): void {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    console.log('SyncService stopped.');
  }

  /**
   * Internal loop to execute sync and schedule the next execution.
   */
  private async runLoop(): Promise<void> {
    if (!this.isRunning) return;

    await this.syncNow();

    if (this.isRunning) {
      this.timer = setTimeout(() => this.runLoop(), this.config.bot.pollIntervalMs);
    }
  }

  /**
   * Checks the current Spotify state and updates Slack if it has changed.
   *
   * @returns A promise that resolves when the sync is complete.
   */
  public async syncNow(): Promise<void> {
    try {
      const activeUsers = await this.userService.getActiveUsers();

      for (const user of activeUsers) {
        const track = await this.spotify.getCurrentlyPlaying(user);
        const stateStr = track
          ? `${track.isPlaying ? 'playing' : 'paused'}:${track.songName}:${track.artistName}`
          : '';

        const lastStateStr = this.userStates.get(user.id) ?? null;

        if (stateStr !== lastStateStr) {
          if (track) {
            const emoji = track.isPlaying ? user.statusEmoji : user.pausedEmoji;
            let statusText = user.statusFormat;

            if (track.songName) {
              statusText = statusText.replace('{song}', track.songName);
            }
            if (track.artistName) {
              statusText = statusText.replace('{artist}', track.artistName);
            }

            await this.slack.setStatus(user, statusText, emoji);
          } else {
            await this.slack.clearStatus(user);
          }
          this.userStates.set(user.id, stateStr);
        }
      }
    } catch (error) {
      console.error('Error during sync:', error);
    }
  }
}
