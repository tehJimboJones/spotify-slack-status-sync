[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [slack](../README.md) / SlackService

# Class: SlackService

Defined in: src/slack.ts:50

Implementation of the Slack service using the @slack/bolt framework.

## Implements

- [`ISlackService`](../interfaces/ISlackService.md)

## Constructors

### Constructor

> **new SlackService**(`config`): `SlackService`

Defined in: src/slack.ts:58

Constructs a new SlackService instance.

#### Parameters

##### config

[`AppConfig`](../../config/interfaces/AppConfig.md)

The application configuration containing Slack credentials.

#### Returns

`SlackService`

## Methods

### clearStatus()

> **clearStatus**(`user`): `Promise`\<`void`\>

Defined in: src/slack.ts:97

Clears the user's Slack status.

#### Parameters

##### user

[`User`](../../user/interfaces/User.md)

The user whose status is being cleared.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the status is cleared.

#### Implementation of

[`ISlackService`](../interfaces/ISlackService.md).[`clearStatus`](../interfaces/ISlackService.md#clearstatus)

***

### registerCommandListener()

> **registerCommandListener**(`listener`): `void`

Defined in: src/slack.ts:128

Registers a command listener.

#### Parameters

##### listener

[`ICommandListener`](../../command/interfaces/ICommandListener.md)

The command listener to register.

#### Returns

`void`

#### Implementation of

[`ISlackService`](../interfaces/ISlackService.md).[`registerCommandListener`](../interfaces/ISlackService.md#registercommandlistener)

***

### setStatus()

> **setStatus**(`user`, `text`, `emoji`): `Promise`\<`void`\>

Defined in: src/slack.ts:75

Sets the user's Slack status.

#### Parameters

##### user

[`User`](../../user/interfaces/User.md)

The user whose status is being updated.

##### text

`string`

The status text to display.

##### emoji

`string`

The emoji to display next to the status.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the status is set.

#### Implementation of

[`ISlackService`](../interfaces/ISlackService.md).[`setStatus`](../interfaces/ISlackService.md#setstatus)

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: src/slack.ts:118

Starts the Bolt app listener.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the app is started.

#### Implementation of

[`ISlackService`](../interfaces/ISlackService.md).[`start`](../interfaces/ISlackService.md#start)
