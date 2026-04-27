[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [db/repositories/UserRepository](../README.md) / SequelizeUserRepository

# Class: SequelizeUserRepository

Defined in: src/db/repositories/UserRepository.ts:7

Sequelize implementation of the User repository.

## Implements

- [`IUserRepository`](../../../../user/interfaces/IUserRepository.md)

## Constructors

### Constructor

> **new SequelizeUserRepository**(): `SequelizeUserRepository`

#### Returns

`SequelizeUserRepository`

## Methods

### create()

> **create**(`user`): `Promise`\<[`User`](../../../../user/interfaces/User.md)\>

Defined in: src/db/repositories/UserRepository.ts:31

Helper method for tests/admin to create users since we removed create() from interface
to align with Phase 1 constraints.

#### Parameters

##### user

`Omit`\<[`User`](../../../../user/interfaces/User.md), `"id"`\>

#### Returns

`Promise`\<[`User`](../../../../user/interfaces/User.md)\>

***

### findAll()

> **findAll**(): `Promise`\<[`User`](../../../../user/interfaces/User.md)[]\>

Defined in: src/db/repositories/UserRepository.ts:22

#### Returns

`Promise`\<[`User`](../../../../user/interfaces/User.md)[]\>

#### Implementation of

[`IUserRepository`](../../../../user/interfaces/IUserRepository.md).[`findAll`](../../../../user/interfaces/IUserRepository.md#findall)

***

### findById()

> **findById**(`id`): `Promise`\<[`User`](../../../../user/interfaces/User.md) \| `null`\>

Defined in: src/db/repositories/UserRepository.ts:8

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`User`](../../../../user/interfaces/User.md) \| `null`\>

#### Implementation of

[`IUserRepository`](../../../../user/interfaces/IUserRepository.md).[`findById`](../../../../user/interfaces/IUserRepository.md#findbyid)

***

### findBySlackId()

> **findBySlackId**(`slackId`): `Promise`\<[`User`](../../../../user/interfaces/User.md) \| `null`\>

Defined in: src/db/repositories/UserRepository.ts:13

#### Parameters

##### slackId

`string`

#### Returns

`Promise`\<[`User`](../../../../user/interfaces/User.md) \| `null`\>

#### Implementation of

[`IUserRepository`](../../../../user/interfaces/IUserRepository.md).[`findBySlackId`](../../../../user/interfaces/IUserRepository.md#findbyslackid)

***

### update()

> **update**(`slackId`, `data`): `Promise`\<`void`\>

Defined in: src/db/repositories/UserRepository.ts:18

#### Parameters

##### slackId

`string`

##### data

`Partial`\<[`User`](../../../../user/interfaces/User.md)\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IUserRepository`](../../../../user/interfaces/IUserRepository.md).[`update`](../../../../user/interfaces/IUserRepository.md#update)
