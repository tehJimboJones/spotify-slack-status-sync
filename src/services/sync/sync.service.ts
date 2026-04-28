import { IConfigService } from '../config/types';
import { ISpotifyService } from '../spotify/types';
import { ISlackService } from '../slack/types';
import { IUserService } from '../user/types';
import { ISyncService } from './types';

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
        const track = await this.spotify.getCurrentlyPlaying(user);
        const stateStr = track
          ? `${track.isPlaying ? 'playing' : 'paused'}:${track.type || 'track'}:${track.songName}:${track.artistName}`
          : '';

        const lastStateStr = this.userStates.get(user.id) ?? null;

        if (stateStr !== lastStateStr) {
          if (track) {
            if (track.type === 'episode' && !user.syncPodcasts) {
              await this.slack.clearStatus(user);
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
                if (track.artistName) statusText = statusText.replace('{artist}', track.artistName);
              }

              await this.slack.setStatus(user, statusText, emoji);
            }
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
