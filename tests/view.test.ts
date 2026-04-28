import { SettingsModalViewListener } from '../src/services/slack/view/settings-modal-view-listener.service';
import { IViewContext } from '../src/services/slack/view/types';
import { IUserService } from '../src/services/user/types';
import { SlackViewAction, ViewOutput } from '@slack/bolt';
import { ISlackService } from '../src/services/slack/types';

describe('SettingsModalViewListener', () => {
  let mockUserService: jest.Mocked<IUserService>;
  let mockSlackService: jest.Mocked<ISlackService>;
  let listener: SettingsModalViewListener;

  beforeEach(() => {
    mockUserService = {
      getUser: jest.fn(),
      getActiveUsers: jest.fn(),
      toggleUserSync: jest.fn(),
      upsertUser: jest.fn().mockResolvedValue(undefined),
    };

    mockSlackService = {} as unknown as jest.Mocked<ISlackService>;

    listener = new SettingsModalViewListener(mockUserService);
  });

  it('should implement IViewListener with correct callback ID', () => {
    expect(listener.viewCallbackId).toBe('settings_modal');
  });

  it('should parse view submission and pass values to upsertUser', async () => {
    const mockAck = jest.fn();
    const context: IViewContext = {
      ack: mockAck,
      body: { user: { id: 'U1' } } as unknown as SlackViewAction,
      view: {
        state: {
          values: {
            status_format_block: { status_format: { value: '{song}' } },
            status_emoji_block: { status_emoji: { value: ':playing:' } },
            paused_emoji_block: { paused_emoji: { value: ':paused:' } },
            sync_podcasts_block: { sync_podcasts: { selected_options: [{ value: 'true' }] } },
            podcast_status_format_block: { podcast_status_format: { value: '{podcast}' } },
            podcast_status_emoji_block: { podcast_status_emoji: { value: ':mic:' } },
            podcast_paused_emoji_block: { podcast_paused_emoji: { value: ':stop:' } },
          },
        },
      } as unknown as ViewOutput,
    };

    await listener.handle(context, mockSlackService);

    expect(mockAck).toHaveBeenCalledWith(); // Expecting empty ack on success
    expect(mockUserService.upsertUser).toHaveBeenCalledWith('U1', {
      statusFormat: '{song}',
      statusEmoji: ':playing:',
      pausedEmoji: ':paused:',
      syncPodcasts: true,
      podcastStatusFormat: '{podcast}',
      podcastStatusEmoji: ':mic:',
      podcastPausedEmoji: ':stop:',
    });
  });

  it('should return errors payload when invalid emojis are provided', async () => {
    const mockAck = jest.fn();
    const context: IViewContext = {
      ack: mockAck,
      body: { user: { id: 'U1' } } as unknown as SlackViewAction,
      view: {
        state: {
          values: {
            status_format_block: { status_format: { value: '{song}' } },
            status_emoji_block: { status_emoji: { value: 'invalid_emoji_no_colons' } },
            paused_emoji_block: { paused_emoji: { value: ':valid:' } },
          },
        },
      } as unknown as ViewOutput,
    };

    await listener.handle(context, mockSlackService);

    expect(mockAck).toHaveBeenCalledWith(
      expect.objectContaining({
        response_action: 'errors',
        errors: expect.objectContaining({
          status_emoji_block: expect.any(String),
        }),
      }),
    );
    expect(mockUserService.upsertUser).not.toHaveBeenCalled();
  });

  it('should accept valid Unicode emojis', async () => {
    const mockAck = jest.fn();
    const context: IViewContext = {
      ack: mockAck,
      body: { user: { id: 'U1' } } as unknown as SlackViewAction,
      view: {
        state: {
          values: {
            status_format_block: { status_format: { value: '{song}' } },
            status_emoji_block: { status_emoji: { value: '🎧' } },
            paused_emoji_block: { paused_emoji: { value: '⏸️' } },
          },
        },
      } as unknown as ViewOutput,
    };

    await listener.handle(context, mockSlackService);

    expect(mockAck).toHaveBeenCalledWith();
    expect(mockUserService.upsertUser).toHaveBeenCalled();
  });
});
