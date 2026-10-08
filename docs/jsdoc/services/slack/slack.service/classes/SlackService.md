[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/slack/slack.service](../README.md) / SlackService

# Class: SlackService

Defined in: [src/services/slack/slack.service.ts:48](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L48)

Concrete implementation of the Slack integration.

## Remarks

Wraps the `@slack/bolt` framework, managing the bot's WebSocket connection and mediating all outbound calls and inbound events.

### Relationships
```mermaid
graph TD
SlackService([SlackService]) -->|Implements| ISlackService[ISlackService]
SlackService -->|Uses| IConfigService[IConfigService]
Client[App Bootstrap] -.->|Instantiates| SlackService
```

## Example

```typescript
const slackService = new SlackService(configService);
```

## Implements

- [`ISlackService`](../../types/interfaces/ISlackService.md)

## Constructors

### Constructor

> **new SlackService**(`configService`): `SlackService`

Defined in: [src/services/slack/slack.service.ts:52](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L52)

#### Parameters

##### configService

[`IConfigService`](../../../config/types/interfaces/IConfigService.md)

#### Returns

`SlackService`

## Methods

### clearStatus()

> **clearStatus**(`user`): `Promise`\<`void`\>

Defined in: [src/services/slack/slack.service.ts:153](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L153)

#### Parameters

##### user

[`User`](../../../user/types/interfaces/User.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ISlackService`](../../types/interfaces/ISlackService.md).[`clearStatus`](../../types/interfaces/ISlackService.md#clearstatus)

***

### getRouter()

> **getRouter**(): `Router`

Defined in: [src/services/slack/slack.service.ts:172](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L172)

#### Returns

`Router`

#### Implementation of

[`ISlackService`](../../types/interfaces/ISlackService.md).[`getRouter`](../../types/interfaces/ISlackService.md#getrouter)

***

### openSettingsModal()

> **openSettingsModal**(`triggerId`, `userId`, `currentSettings`): `Promise`\<`void`\>

Defined in: [src/services/slack/slack.service.ts:196](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L196)

#### Parameters

##### triggerId

`string`

##### userId

`string`

##### currentSettings

`Partial`\<[`User`](../../../user/types/interfaces/User.md)\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ISlackService`](../../types/interfaces/ISlackService.md).[`openSettingsModal`](../../types/interfaces/ISlackService.md#opensettingsmodal)

***

### registerCommandListener()

> **registerCommandListener**(`listener`): `void`

Defined in: [src/services/slack/slack.service.ts:179](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L179)

#### Parameters

##### listener

[`ICommandListener`](../../command/types/interfaces/ICommandListener.md)

#### Returns

`void`

#### Implementation of

[`ISlackService`](../../types/interfaces/ISlackService.md).[`registerCommandListener`](../../types/interfaces/ISlackService.md#registercommandlistener)

***

### registerEventListener()

> **registerEventListener**(`listener`): `void`

Defined in: [src/services/slack/slack.service.ts:121](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L121)

#### Parameters

##### listener

[`IEventListener`](../../types/interfaces/IEventListener.md)

#### Returns

`void`

#### Implementation of

[`ISlackService`](../../types/interfaces/ISlackService.md).[`registerEventListener`](../../types/interfaces/ISlackService.md#registereventlistener)

***

### registerViewListener()

> **registerViewListener**(`listener`): `void`

Defined in: [src/services/slack/slack.service.ts:127](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L127)

#### Parameters

##### listener

[`IViewListener`](../../view/types/interfaces/IViewListener.md)

#### Returns

`void`

#### Implementation of

[`ISlackService`](../../types/interfaces/ISlackService.md).[`registerViewListener`](../../types/interfaces/ISlackService.md#registerviewlistener)

***

### sendMessage()

> **sendMessage**(`channelOrUserId`, `text`, `options?`): `Promise`\<\{ `channel`: `string`; `messageTimestamp`: `string`; \} \| `null`\>

Defined in: [src/services/slack/slack.service.ts:62](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L62)

#### Parameters

##### channelOrUserId

`string`

##### text

`string`

##### options?

[`SlackSendMessageOptions`](../../types/interfaces/SlackSendMessageOptions.md)

#### Returns

`Promise`\<\{ `channel`: `string`; `messageTimestamp`: `string`; \} \| `null`\>

#### Implementation of

[`ISlackService`](../../types/interfaces/ISlackService.md).[`sendMessage`](../../types/interfaces/ISlackService.md#sendmessage)

***

### setStatus()

> **setStatus**(`user`, `text`, `emoji`): `Promise`\<`void`\>

Defined in: [src/services/slack/slack.service.ts:134](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L134)

#### Parameters

##### user

[`User`](../../../user/types/interfaces/User.md)

##### text

`string`

##### emoji

`string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ISlackService`](../../types/interfaces/ISlackService.md).[`setStatus`](../../types/interfaces/ISlackService.md#setstatus)

***

### updateMessage()

> **updateMessage**(`channel`, `messageTimestamp`, `text`): `Promise`\<`void`\>

Defined in: [src/services/slack/slack.service.ts:102](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/slack.service.ts#L102)

#### Parameters

##### channel

`string`

##### messageTimestamp

`string`

##### text

`string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`ISlackService`](../../types/interfaces/ISlackService.md).[`updateMessage`](../../types/interfaces/ISlackService.md#updatemessage)
