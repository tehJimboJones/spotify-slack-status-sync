[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [db/repositories/AcronymConfigRepository](../README.md) / SequelizeAcronymConfigRepository

# Class: SequelizeAcronymConfigRepository

Defined in: src/db/repositories/AcronymConfigRepository.ts:21

Concrete implementation of IAcronymConfigRepository backed by Sequelize.

## Implements

- [`IAcronymConfigRepository`](../../../../services/acronym/types/interfaces/IAcronymConfigRepository.md)

## Constructors

### Constructor

> **new SequelizeAcronymConfigRepository**(): `SequelizeAcronymConfigRepository`

#### Returns

`SequelizeAcronymConfigRepository`

## Methods

### getConfig()

> **getConfig**(): `Promise`\<[`AcronymConfig`](../../../../services/acronym/types/interfaces/AcronymConfig.md)\>

Defined in: src/db/repositories/AcronymConfigRepository.ts:22

Retrieves the current configuration

#### Returns

`Promise`\<[`AcronymConfig`](../../../../services/acronym/types/interfaces/AcronymConfig.md)\>

#### Implementation of

[`IAcronymConfigRepository`](../../../../services/acronym/types/interfaces/IAcronymConfigRepository.md).[`getConfig`](../../../../services/acronym/types/interfaces/IAcronymConfigRepository.md#getconfig)

***

### updateConfig()

> **updateConfig**(`updates`): `Promise`\<[`AcronymConfig`](../../../../services/acronym/types/interfaces/AcronymConfig.md)\>

Defined in: src/db/repositories/AcronymConfigRepository.ts:37

Updates the configuration partially and returns the updated state

#### Parameters

##### updates

`Partial`\<`Omit`\<[`AcronymConfig`](../../../../services/acronym/types/interfaces/AcronymConfig.md), `"id"`\>\>

#### Returns

`Promise`\<[`AcronymConfig`](../../../../services/acronym/types/interfaces/AcronymConfig.md)\>

#### Implementation of

[`IAcronymConfigRepository`](../../../../services/acronym/types/interfaces/IAcronymConfigRepository.md).[`updateConfig`](../../../../services/acronym/types/interfaces/IAcronymConfigRepository.md#updateconfig)
