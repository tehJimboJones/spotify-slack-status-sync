/**
 * Synchronization service module.
 * Orchestrates the polling of Spotify and updating of Slack.
 */
import { AppConfig } from './config';
import { ISpotifyService, TrackState } from './spotify';
import { ISlackService } from './slack';

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
  private intervalId: NodeJS.Timeout | null = null;
  private lastStateStr: string = '';

  /**
   * Constructs a new SyncService.
   *
   * @param {ISpotifyService} spotify - The Spotify service instance.
   * @param {ISlackService} slack - The Slack service instance.
   * @param {AppConfig} config - The application configuration.
   */
  constructor(
    private spotify: ISpotifyService,
    private slack: ISlackService,
    private config: AppConfig,
  ) {}

  /**
   * Starts the polling loop to continuously synchronize state.
   */
  public start(): void {
    if (this.intervalId) {
      return;
    }

    // Run immediately, then set interval
    this.syncNow();
    this.intervalId = setInterval(() => this.syncNow(), this.config.bot.pollIntervalMs);
    console.log(`SyncService started. Polling every ${this.config.bot.pollIntervalMs}ms.`);
  }

  /**
   * Stops the polling loop.
   */
  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('SyncService stopped.');
    }
  }

  /**
   * Checks the current Spotify state and updates Slack if it has changed.
   *
   * @returns {Promise<void>}
   */
  public async syncNow(): Promise<void> {
    try {
      const track = await this.spotify.getCurrentlyPlaying();
      const stateStr = JSON.stringify(track);

      // Only update if state changed
      if (stateStr === this.lastStateStr) {
        return;
      }

      this.lastStateStr = stateStr;

      if (!track) {
        // Stopped playing
        await this.slack.clearStatus();
      } else {
        // Playing or paused
        const text = this.formatStatus(track);
        const emoji = track.isPlaying ? this.config.bot.statusEmoji : this.config.bot.pausedEmoji;
        await this.slack.setStatus(text, emoji);
      }
    } catch (error) {
      console.error('Error during syncNow:', error);
    }
  }

  private formatStatus(track: TrackState): string {
    return this.config.bot.statusFormat
      .replace('{song}', track.songName || 'Unknown Song')
      .replace('{artist}', track.artistName || 'Unknown Artist');
  }
}
