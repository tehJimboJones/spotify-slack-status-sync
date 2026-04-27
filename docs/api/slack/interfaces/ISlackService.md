[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [slack](../README.md) / ISlackService

# Interface: ISlackService

Defined in: src/slack.ts:13

Interface defining the operations for interacting with Slack.

## Methods

### clearStatus()

> **clearStatus**(`user`): `Promise`\<`void`\>

Defined in: src/slack.ts:30

Clears the user's Slack status.

#### Parameters

##### user

[`User`](../../user/interfaces/User.md)

The user whose status is being cleared.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the status is cleared.

***

### registerCommandListener()

> **registerCommandListener**(`listener`): `void`

Defined in: src/slack.ts:44

Registers a slash command listener with the underlying Bolt app.

#### Parameters

##### listener

[`ICommandListener`](../../command/interfaces/ICommandListener.md)

The listener to register.

#### Returns

`void`

***

### setStatus()

> **setStatus**(`user`, `text`, `emoji`): `Promise`\<`void`\>

Defined in: src/slack.ts:22

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

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: src/slack.ts:37

Starts the Bolt app listener to receive incoming commands/events.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the app is started.
