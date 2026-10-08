[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/acronym/mock-acronym-config.repository](../README.md) / MockAcronymConfigRepository

# Class: MockAcronymConfigRepository

Defined in: src/services/acronym/mock-acronym-config.repository.ts:19

In-memory mock implementation of IAcronymConfigRepository.

## Implements

- [`IAcronymConfigRepository`](../../types/interfaces/IAcronymConfigRepository.md)

## Constructors

### Constructor

> **new MockAcronymConfigRepository**(`initialConfig?`): `MockAcronymConfigRepository`

Defined in: src/services/acronym/mock-acronym-config.repository.ts:22

#### Parameters

##### initialConfig?

`Partial`\<[`AcronymConfig`](../../types/interfaces/AcronymConfig.md)\>

#### Returns

`MockAcronymConfigRepository`

## Methods

### getConfig()

> **getConfig**(): `Promise`\<[`AcronymConfig`](../../types/interfaces/AcronymConfig.md)\>

Defined in: src/services/acronym/mock-acronym-config.repository.ts:31

Retrieves the current configuration

#### Returns

`Promise`\<[`AcronymConfig`](../../types/interfaces/AcronymConfig.md)\>

#### Implementation of

[`IAcronymConfigRepository`](../../types/interfaces/IAcronymConfigRepository.md).[`getConfig`](../../types/interfaces/IAcronymConfigRepository.md#getconfig)

***

### updateConfig()

> **updateConfig**(`updates`): `Promise`\<[`AcronymConfig`](../../types/interfaces/AcronymConfig.md)\>

Defined in: src/services/acronym/mock-acronym-config.repository.ts:39

Updates the configuration partially and returns the updated state

#### Parameters

##### updates

`Partial`\<`Omit`\<[`AcronymConfig`](../../types/interfaces/AcronymConfig.md), `"id"`\>\>

#### Returns

`Promise`\<[`AcronymConfig`](../../types/interfaces/AcronymConfig.md)\>

#### Implementation of

[`IAcronymConfigRepository`](../../types/interfaces/IAcronymConfigRepository.md).[`updateConfig`](../../types/interfaces/IAcronymConfigRepository.md#updateconfig)
