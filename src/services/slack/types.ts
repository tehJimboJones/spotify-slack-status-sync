import { User } from '../user/types';
import { ICommandListener } from './command/types';
import { IViewListener } from './view/types';
import { SlackEvent, ViewResponseAction } from '@slack/bolt';

export { SlackEvent, ViewResponseAction };

export interface IEventContext {
  body: Record<string, unknown>;
  event: SlackEvent;
}

export interface IEventListener {
  eventName: string;
  handle(context: IEventContext, slackService: ISlackService): Promise<void>;
}

export interface ISlackService {
  sendMessage(
    channelOrUserId: string,
    text: string,
  ): Promise<{ channel: string; messageTimestamp: string } | null>;
  updateMessage(channel: string, messageTimestamp: string, text: string): Promise<void>;
  setStatus(user: User, text: string, emoji: string): Promise<void>;
  clearStatus(user: User): Promise<void>;
  start(): Promise<void>;
  registerCommandListener(listener: ICommandListener): void;
  registerViewListener(listener: IViewListener): void;
  registerEventListener(listener: IEventListener): void;
  openSettingsModal(
    triggerId: string,
    userId: string,
    currentSettings: Partial<User>,
  ): Promise<void>;
}
