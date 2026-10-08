[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/acronym/types](../README.md) / IAcronymConfigRepository

# Interface: IAcronymConfigRepository

Defined in: src/services/acronym/types.ts:65

Repository contract for persisting acronym feature configuration.

## Methods

### getConfig()

> **getConfig**(): `Promise`\<[`AcronymConfig`](AcronymConfig.md)\>

Defined in: src/services/acronym/types.ts:67

Retrieves the current configuration

#### Returns

`Promise`\<[`AcronymConfig`](AcronymConfig.md)\>

***

### updateConfig()

> **updateConfig**(`updates`): `Promise`\<[`AcronymConfig`](AcronymConfig.md)\>

Defined in: src/services/acronym/types.ts:69

Updates the configuration partially and returns the updated state

#### Parameters

##### updates

`Partial`\<`Omit`\<[`AcronymConfig`](AcronymConfig.md), `"id"`\>\>

#### Returns

`Promise`\<[`AcronymConfig`](AcronymConfig.md)\>
