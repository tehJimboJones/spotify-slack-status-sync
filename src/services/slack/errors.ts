import { AppError } from '../../errors';

export class SlackMessageSendError extends AppError {
  constructor(message: string = 'Failed to send message to Slack') {
    super(message, 'SLACK_MESSAGE_SEND_ERROR');
  }
}

export class SlackMessageUpdateError extends AppError {
  constructor(message: string = 'Failed to update message in Slack') {
    super(message, 'SLACK_MESSAGE_UPDATE_ERROR');
  }
}

export class SlackStatusSetError extends AppError {
  constructor(message: string = 'Failed to set Slack status') {
    super(message, 'SLACK_STATUS_SET_ERROR');
  }
}

export class SlackStatusClearError extends AppError {
  constructor(message: string = 'Failed to clear Slack status') {
    super(message, 'SLACK_STATUS_CLEAR_ERROR');
  }
}

export class SlackSettingsModalError extends AppError {
  constructor(message: string = 'Failed to open Slack settings modal') {
    super(message, 'SLACK_SETTINGS_MODAL_ERROR');
  }
}
