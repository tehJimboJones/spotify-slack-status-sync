[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/slack/types](../README.md) / IEventListener

# Interface: IEventListener

Defined in: [src/services/slack/types.ts:80](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/types.ts#L80)

Interface for handling Slack events.

## Remarks

Defines a contract for processing real-time Slack events (like reactions or messages), decoupled from the main Slack service.

### Relationships
```mermaid
graph TD
IEventListener([IEventListener])
ReactionAddedListenerService[ReactionAddedListenerService] -->|Implements| IEventListener
ISlackService[ISlackService] -->|Registers| IEventListener
```

## Example

```typescript
slackService.registerEventListener('reaction_added', reactionListener);
```

## Properties

### eventName

> **eventName**: `string`

Defined in: [src/services/slack/types.ts:81](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/types.ts#L81)

## Methods

### handle()

> **handle**(`context`, `slackService`): `Promise`\<`void`\>

Defined in: [src/services/slack/types.ts:82](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/types.ts#L82)

#### Parameters

##### context

[`IEventContext`](IEventContext.md)

##### slackService

[`ISlackService`](ISlackService.md)

#### Returns

`Promise`\<`void`\>
