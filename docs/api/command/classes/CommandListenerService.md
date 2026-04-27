[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [command](../README.md) / CommandListenerService

# Class: CommandListenerService

Defined in: src/command.ts:27

Service to handle the /spotifystatus slash command.

## Implements

- [`ICommandListener`](../interfaces/ICommandListener.md)

## Constructors

### Constructor

> **new CommandListenerService**(`userService`): `CommandListenerService`

Defined in: src/command.ts:35

Constructs the CommandListenerService.

#### Parameters

##### userService

[`IUserService`](../../user/interfaces/IUserService.md)

The user service to toggle states.

#### Returns

`CommandListenerService`

## Properties

### commandName

> `readonly` **commandName**: `"/spotifystatus"` = `'/spotifystatus'`

Defined in: src/command.ts:28

#### Implementation of

[`ICommandListener`](../interfaces/ICommandListener.md).[`commandName`](../interfaces/ICommandListener.md#commandname)

## Methods

### handle()

> **handle**(`context`): `Promise`\<`void`\>

Defined in: src/command.ts:43

Handles incoming command payloads.

#### Parameters

##### context

[`ICommandContext`](../interfaces/ICommandContext.md)

The command context.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the command is handled.

#### Implementation of

[`ICommandListener`](../interfaces/ICommandListener.md).[`handle`](../interfaces/ICommandListener.md#handle)
