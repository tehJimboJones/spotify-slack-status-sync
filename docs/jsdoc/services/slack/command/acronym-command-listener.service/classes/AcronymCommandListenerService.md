[**spotify-status-bot**](../../../../../README.md)

***

[spotify-status-bot](../../../../../README.md) / [services/slack/command/acronym-command-listener.service](../README.md) / AcronymCommandListenerService

# Class: AcronymCommandListenerService

Defined in: src/services/slack/command/acronym-command-listener.service.ts:22

Concrete implementation of ICommandListener for the /acronym slash command.

## Implements

- [`ICommandListener`](../../types/interfaces/ICommandListener.md)

## Constructors

### Constructor

> **new AcronymCommandListenerService**(`acronymService`): `AcronymCommandListenerService`

Defined in: src/services/slack/command/acronym-command-listener.service.ts:25

#### Parameters

##### acronymService

[`IAcronymService`](../../../../acronym/types/interfaces/IAcronymService.md)

#### Returns

`AcronymCommandListenerService`

## Properties

### commandName

> `readonly` **commandName**: `"/acronym"` = `'/acronym'`

Defined in: src/services/slack/command/acronym-command-listener.service.ts:23

#### Implementation of

[`ICommandListener`](../../types/interfaces/ICommandListener.md).[`commandName`](../../types/interfaces/ICommandListener.md#commandname)

## Methods

### handle()

> **handle**(`context`, `_slackService`): `Promise`\<`void`\>

Defined in: src/services/slack/command/acronym-command-listener.service.ts:28

#### Parameters

##### context

[`ICommandContext`](../../types/interfaces/ICommandContext.md)

##### \_slackService

[`ISlackService`](../../../types/interfaces/ISlackService.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ICommandListener`](../../types/interfaces/ICommandListener.md).[`handle`](../../types/interfaces/ICommandListener.md#handle)
