[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [user](../README.md) / IUserRepository

# Interface: IUserRepository

Defined in: src/user.ts:20

Interface defining the operations for interacting with User persistence.

## Methods

### findAll()

> **findAll**(): `Promise`\<[`User`](User.md)[]\>

Defined in: src/user.ts:24

#### Returns

`Promise`\<[`User`](User.md)[]\>

***

### findById()

> **findById**(`id`): `Promise`\<[`User`](User.md) \| `null`\>

Defined in: src/user.ts:21

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`User`](User.md) \| `null`\>

***

### findBySlackId()

> **findBySlackId**(`slackId`): `Promise`\<[`User`](User.md) \| `null`\>

Defined in: src/user.ts:22

#### Parameters

##### slackId

`string`

#### Returns

`Promise`\<[`User`](User.md) \| `null`\>

***

### update()

> **update**(`slackId`, `data`): `Promise`\<`void`\>

Defined in: src/user.ts:23

#### Parameters

##### slackId

`string`

##### data

`Partial`\<[`User`](User.md)\>

#### Returns

`Promise`\<`void`\>
