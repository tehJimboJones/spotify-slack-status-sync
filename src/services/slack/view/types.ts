import { SlackViewAction, ViewOutput } from '@slack/bolt';
import { ISlackService, ViewResponseAction } from '../types';

export interface IViewContext {
  ack: (response?: ViewResponseAction) => Promise<void>;
  body: SlackViewAction;
  view: ViewOutput;
}

export interface IViewListener {
  viewCallbackId: string | RegExp;
  handle(context: IViewContext, slackService: ISlackService): Promise<void>;
}
