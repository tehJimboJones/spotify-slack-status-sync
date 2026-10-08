[**spotify-status-bot**](../../../../../README.md)

***

[spotify-status-bot](../../../../../README.md) / [services/slack/event/acronym-message-listener.service](../README.md) / AcronymMessageListenerService

# Class: AcronymMessageListenerService

Defined in: src/services/slack/event/acronym-message-listener.service.ts:20

Event listener handling incoming Slack channel messages.

## Implements

- [`IEventListener`](../../../types/interfaces/IEventListener.md)

## Constructors

### Constructor

> **new AcronymMessageListenerService**(`acronymService`): `AcronymMessageListenerService`

Defined in: src/services/slack/event/acronym-message-listener.service.ts:23

#### Parameters

##### acronymService

[`IAcronymService`](../../../../acronym/types/interfaces/IAcronymService.md)

#### Returns

`AcronymMessageListenerService`

## Properties

### eventName

> `readonly` **eventName**: `"message"` = `'message'`

Defined in: src/services/slack/event/acronym-message-listener.service.ts:21

#### Implementation of

[`IEventListener`](../../../types/interfaces/IEventListener.md).[`eventName`](../../../types/interfaces/IEventListener.md#eventname)

## Methods

### handle()

> **handle**(`context`, `slackService`): `Promise`\<`void`\>

Defined in: src/services/slack/event/acronym-message-listener.service.ts:25

#### Parameters

##### context

[`IEventContext`](../../../types/interfaces/IEventContext.md)

##### slackService

[`ISlackService`](../../../types/interfaces/ISlackService.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IEventListener`](../../../types/interfaces/IEventListener.md).[`handle`](../../../types/interfaces/IEventListener.md#handle)
