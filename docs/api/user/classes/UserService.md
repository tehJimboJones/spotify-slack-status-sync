[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [user](../README.md) / UserService

# Class: UserService

Defined in: src/user.ts:79

Service encapsulating business logic for User operations.

## Implements

- [`IUserService`](../interfaces/IUserService.md)

## Constructors

### Constructor

> **new UserService**(`userRepository`): `UserService`

Defined in: src/user.ts:80

#### Parameters

##### userRepository

[`IUserRepository`](../interfaces/IUserRepository.md)

#### Returns

`UserService`

## Methods

### getActiveUsers()

> **getActiveUsers**(): `Promise`\<[`User`](../interfaces/User.md)[]\>

Defined in: src/user.ts:85

Retrieves all users who currently have background sync enabled.

#### Returns

`Promise`\<[`User`](../interfaces/User.md)[]\>

#### Implementation of

[`IUserService`](../interfaces/IUserService.md).[`getActiveUsers`](../interfaces/IUserService.md#getactiveusers)

***

### toggleUserSync()

> **toggleUserSync**(`slackId`, `isSyncActive`): `Promise`\<`void`\>

Defined in: src/user.ts:93

Toggles the background sync status for a given user.

#### Parameters

##### slackId

`string`

##### isSyncActive

`boolean`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IUserService`](../interfaces/IUserService.md).[`toggleUserSync`](../interfaces/IUserService.md#toggleusersync)
