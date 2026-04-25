/**
 * Slack service module.
 * Provides integration with the Slack API to update user profile status.
 */
import { App } from '@slack/bolt';
import { AppConfig } from './config';

/**
 * Interface defining the operations for interacting with Slack.
 */
export interface ISlackService {
  /**
   * Updates the user's Slack status.
   *
   * @param {string} text - The text to display in the status.
   * @param {string} emoji - The emoji code to display (e.g., ':headphones:').
   * @returns {Promise<void>}
   */
  setStatus(text: string, emoji: string): Promise<void>;

  /**
   * Clears the user's Slack status.
   *
   * @returns {Promise<void>}
   */
  clearStatus(): Promise<void>;
}

/**
 * Implementation of the Slack service using the @slack/bolt framework.
 */
export class SlackService implements ISlackService {
  private app: App;

  /**
   * Constructs a new SlackService instance.
   *
   * @param {AppConfig} config - The application configuration containing Slack credentials.
   */
  constructor(config: AppConfig) {
    this.app = new App({
      token: config.slack.userToken,
      signingSecret: config.slack.signingSecret,
      appToken: config.slack.appToken,
      socketMode: !!config.slack.appToken,
    });
  }

  /**
   * Updates the user's Slack status.
   *
   * @param {string} text - The status text.
   * @param {string} emoji - The status emoji.
   * @returns {Promise<void>}
   */
  public async setStatus(text: string, emoji: string): Promise<void> {
    try {
      await this.app.client.users.profile.set({
        profile: JSON.stringify({
          status_text: text,
          status_emoji: emoji,
          status_expiration: 0,
        }),
      });
      console.log(`Updated Slack status to: ${emoji} ${text}`);
    } catch (error) {
      console.error('Failed to set Slack status:', error);
    }
  }

  /**
   * Clears the user's Slack status.
   *
   * @returns {Promise<void>}
   */
  public async clearStatus(): Promise<void> {
    try {
      await this.app.client.users.profile.set({
        profile: JSON.stringify({
          status_text: '',
          status_emoji: '',
          status_expiration: 0,
        }),
      });
      console.log('Cleared Slack status');
    } catch (error) {
      console.error('Failed to clear Slack status:', error);
    }
  }
}
