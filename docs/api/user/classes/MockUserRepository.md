[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [user](../README.md) / MockUserRepository

# Class: MockUserRepository

Defined in: src/user.ts:31

A mock repository that seeds a single user from the AppConfig.
Used during Phase 1 transition before introducing the database.

## Implements

- [`IUserRepository`](../interfaces/IUserRepository.md)

## Constructors

### Constructor

> **new MockUserRepository**(`config`): `MockUserRepository`

Defined in: src/user.ts:34

#### Parameters

##### config

[`AppConfig`](../../config/interfaces/AppConfig.md)

#### Returns

`MockUserRepository`

## Methods

### findAll()

> **findAll**(): `Promise`\<[`User`](../interfaces/User.md)[]\>

Defined in: src/user.ts:63

#### Returns

`Promise`\<[`User`](../interfaces/User.md)[]\>

#### Implementation of

[`IUserRepository`](../interfaces/IUserRepository.md).[`findAll`](../interfaces/IUserRepository.md#findall)

***

### findById()

> **findById**(`id`): `Promise`\<[`User`](../interfaces/User.md) \| `null`\>

Defined in: src/user.ts:48

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`User`](../interfaces/User.md) \| `null`\>

#### Implementation of

[`IUserRepository`](../interfaces/IUserRepository.md).[`findById`](../interfaces/IUserRepository.md#findbyid)

***

### findBySlackId()

> **findBySlackId**(`slackId`): `Promise`\<[`User`](../interfaces/User.md) \| `null`\>

Defined in: src/user.ts:52

#### Parameters

##### slackId

`string`

#### Returns

`Promise`\<[`User`](../interfaces/User.md) \| `null`\>

#### Implementation of

[`IUserRepository`](../interfaces/IUserRepository.md).[`findBySlackId`](../interfaces/IUserRepository.md#findbyslackid)

***

### update()

> **update**(`slackId`, `data`): `Promise`\<`void`\>

Defined in: src/user.ts:56

#### Parameters

##### slackId

`string`

##### data

`Partial`\<[`User`](../interfaces/User.md)\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IUserRepository`](../interfaces/IUserRepository.md).[`update`](../interfaces/IUserRepository.md#update)
