import { SlackViewAction, ViewOutput } from '@slack/bolt';

export interface IViewContext {
  ack: () => Promise<void>;
  body: SlackViewAction;
  view: ViewOutput;
}

export interface IViewListener {
  viewCallbackId: string | RegExp;
  handle(context: IViewContext): Promise<void>;
}
