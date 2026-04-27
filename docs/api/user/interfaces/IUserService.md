[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [user](../README.md) / IUserService

# Interface: IUserService

Defined in: src/user.ts:71

Interface defining the business logic layer for Users.

## Methods

### getActiveUsers()

> **getActiveUsers**(): `Promise`\<[`User`](User.md)[]\>

Defined in: src/user.ts:72

#### Returns

`Promise`\<[`User`](User.md)[]\>

***

### toggleUserSync()

> **toggleUserSync**(`slackId`, `isSyncActive`): `Promise`\<`void`\>

Defined in: src/user.ts:73

#### Parameters

##### slackId

`string`

##### isSyncActive

`boolean`

#### Returns

`Promise`\<`void`\>
