/**
 * Slack slash command handler for the acronym feature.
 * @remarks
 * Handles /acronym commands: start, stop, status, and configuration of channels and acronyms.
 *
 * @author jmaciejewski
 * @date   2026-10-08
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { ICommandListener, ICommandContext } from './types';
import { ISlackService } from '../types';
import { IAcronymService } from '../../acronym/types';
import { AcronymNotFoundError } from '../../acronym/errors';

/**
 * Concrete implementation of ICommandListener for the /acronym slash command.
 *
 * @public
 */
export class AcronymCommandListenerService implements ICommandListener {
  public readonly commandName = '/acronym';

  constructor(private acronymService: IAcronymService) {}

  public async handle(context: ICommandContext, slackService: ISlackService): Promise<void> {
    const rawText = (context.text || '').trim();
    const parts = rawText.split(/\s+/).filter(Boolean);
    const action = parts[0]?.toLowerCase();

    try {
      if (action === 'start') {
        await this.acronymService.setGuessingActive(true);
        await context.respond('Acronym guessing behavior started! :robot_face:');
      } else if (action === 'stop') {
        await this.acronymService.setGuessingActive(false);
        await context.respond('Acronym guessing behavior stopped. :octagonal_sign:');
      } else if (action === 'status') {
        await this.handleStatus(context);
      } else if (action === 'config') {
        await this.handleConfig(parts.slice(1), context, slackService);
      } else {
        await this.handleHelp(context);
      }
    } catch (error) {
      if (error instanceof AcronymNotFoundError) {
        await context.respond(`Error: ${error.message}`);
      } else {
        console.error('Error handling acronym command:', error);
        await context.respond(
          'An unexpected error occurred while processing the /acronym command.',
        );
      }
    }
  }

  private async handleStatus(context: ICommandContext): Promise<void> {
    const isActive = await this.acronymService.isGuessingActive();
    const channels = await this.acronymService.getMonitoredChannels();
    const enabledAcronyms = await this.acronymService.getEnabledAcronyms();
    const availableAcronyms = this.acronymService.getAvailableAcronyms();

    const channelDisplay =
      channels.length > 0 ? channels.map((c) => `<#${c}> (${c})`).join(', ') : '_None configured_';
    const enabledDisplay =
      enabledAcronyms.length > 0 ? enabledAcronyms.join(', ') : '_None enabled_';

    const lines = [
      `*Acronym Guesser Status*: ${isActive ? ':white_check_mark: Active' : ':octagonal_sign: Stopped'}`,
      `*Monitored Channels* (${channels.length}): ${channelDisplay}`,
      `*Enabled Acronyms* (${enabledAcronyms.length}): ${enabledDisplay}`,
      `*Available in Catalog* (${availableAcronyms.length}): ${availableAcronyms.join(', ')}`,
    ];

    await context.respond(lines.join('\n'));
  }

  private async handleConfig(
    parts: string[],
    context: ICommandContext,
    slackService: ISlackService,
  ): Promise<void> {
    const target = parts[0]?.toLowerCase();

    if (target === 'channels') {
      await this.handleConfigChannels(parts.slice(1), context, slackService);
    } else if (target === 'acronyms') {
      await this.handleConfigAcronyms(parts.slice(1), context);
    } else {
      await context.respond(
        'Usage: `/acronym config channels <list|add|remove|set> [channel_ids]` or `/acronym config acronyms <list|add|remove|set> [acronyms]`.',
      );
    }
  }

  private async handleConfigChannels(
    parts: string[],
    context: ICommandContext,
    slackService: ISlackService,
  ): Promise<void> {
    const operation = parts[0]?.toLowerCase();
    let channelArgs = this.parseChannelList(parts.slice(1), context.channelId);

    if (operation === 'list') {
      const channels = await this.acronymService.getMonitoredChannels();
      const listDisplay =
        channels.length > 0
          ? channels.map((c) => `<#${c}> (${c})`).join(', ')
          : '_None configured_';
      await context.respond(`Monitored channels: ${listDisplay}`);
    } else if (operation === 'add') {
      if (channelArgs.length === 0 && context.channelId) {
        channelArgs = [context.channelId];
      } else if (channelArgs.length === 0) {
        await context.respond(
          'Please provide channel ID(s) to add, e.g. `/acronym config channels add here` or `/acronym config channels add C0123456789`.',
        );
        return;
      }
      const updated = await this.acronymService.addMonitoredChannels(channelArgs);
      // Attempt to auto-join any added channels (works for public channels with channels:join scope)
      await Promise.allSettled(channelArgs.map((c) => slackService.joinChannel(c)));

      let responseMsg = `Added channel(s). Monitored channels: ${updated.map((c) => `<#${c}> (${c})`).join(', ')}`;
      const hasNamedChannel = channelArgs.some((c) => !/^[CGD][A-Z0-9]{8,}$/i.test(c));
      if (hasNamedChannel) {
        responseMsg +=
          '\n\n💡 *Note*: Slack matches events using channel IDs (e.g., `C0123...` or `G0123...`). If you passed a channel name (like `#jims-channel`), Slack events will not match it. Tip: run `/acronym config channels add here` inside that channel to automatically record its channel ID!';
      }
      await context.respond(responseMsg);
    } else if (operation === 'remove') {
      if (channelArgs.length === 0 && context.channelId) {
        channelArgs = [context.channelId];
      } else if (channelArgs.length === 0) {
        await context.respond('Please provide channel ID(s) to remove.');
        return;
      }
      const updated = await this.acronymService.removeMonitoredChannels(channelArgs);
      await context.respond(
        `Removed channel(s). Monitored channels: ${updated.map((c) => `<#${c}> (${c})`).join(', ')}`,
      );
    } else if (operation === 'set') {
      const updated = await this.acronymService.setMonitoredChannels(channelArgs);
      await context.respond(
        `Updated monitored channels: ${updated.map((c) => `<#${c}> (${c})`).join(', ')}`,
      );
    } else {
      await context.respond(
        'Usage: `/acronym config channels <list|add|remove|set> [channel_ids]` (tip: use `here` to add current channel)',
      );
    }
  }

  private async handleConfigAcronyms(parts: string[], context: ICommandContext): Promise<void> {
    const operation = parts[0]?.toLowerCase();
    const acronymArgs = this.parseAcronymList(parts.slice(1));

    if (operation === 'list') {
      const enabled = await this.acronymService.getEnabledAcronyms();
      const available = this.acronymService.getAvailableAcronyms();
      await context.respond(
        `Enabled acronyms: ${enabled.join(', ') || '_None_'}\nAvailable catalog: ${available.join(', ')}`,
      );
    } else if (operation === 'add') {
      if (acronymArgs.length === 0) {
        await context.respond(
          'Please provide acronym(s) to add, e.g. `/acronym config acronyms add BTU`',
        );
        return;
      }
      const updated = await this.acronymService.addEnabledAcronyms(acronymArgs);
      await context.respond(`Added acronym(s). Enabled acronyms: ${updated.join(', ')}`);
    } else if (operation === 'remove') {
      if (acronymArgs.length === 0) {
        await context.respond('Please provide acronym(s) to remove.');
        return;
      }
      const updated = await this.acronymService.removeEnabledAcronyms(acronymArgs);
      await context.respond(`Removed acronym(s). Enabled acronyms: ${updated.join(', ')}`);
    } else if (operation === 'set') {
      const updated = await this.acronymService.setEnabledAcronyms(acronymArgs);
      await context.respond(`Updated enabled acronyms: ${updated.join(', ')}`);
    } else {
      await context.respond('Usage: `/acronym config acronyms <list|add|remove|set> [acronyms]`');
    }
  }

  private async handleHelp(context: ICommandContext): Promise<void> {
    const helpText = [
      '*Acronym Guesser Commands*:',
      '• `/acronym start` - Start guessing behavior in monitored channels',
      '• `/acronym stop` - Stop guessing behavior',
      '• `/acronym status` - View current status, channels, and enabled acronyms',
      '• `/acronym config channels <list|add|remove|set> [channels]` - Configure monitored channels',
      '• `/acronym config acronyms <list|add|remove|set> [acronyms]` - Configure enabled acronyms',
    ].join('\n');

    await context.respond(helpText);
  }

  private parseChannelList(rawArgs: string[], currentChannelId?: string): string[] {
    const rawJoined = rawArgs.join(' ');
    const tokens = rawJoined.split(/[,\s]+/).filter(Boolean);
    return tokens.map((token) => {
      if (['here', 'this', 'current'].includes(token.toLowerCase()) && currentChannelId) {
        return currentChannelId;
      }
      // Handle <#C12345|general> or <#C12345>
      const match = token.match(/^<#([A-Z0-9]+)(?:\|[^>]+)?>$/i);
      if (match) {
        return match[1];
      }
      return token.replace(/^#/, '');
    });
  }

  private parseAcronymList(rawArgs: string[]): string[] {
    const rawJoined = rawArgs.join(' ');
    return rawJoined
      .split(/[,\s]+/)
      .filter(Boolean)
      .map((a) => a.trim().toUpperCase());
  }
}
