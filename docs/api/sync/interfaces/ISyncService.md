[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [sync](../README.md) / ISyncService

# Interface: ISyncService

Defined in: src/sync.ts:13

Interface defining the operations for the synchronization service.

## Methods

### start()

> **start**(): `void`

Defined in: src/sync.ts:15

Starts the synchronization polling loop.

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Defined in: src/sync.ts:17

Stops the synchronization polling loop.

#### Returns

`void`

***

### syncNow()

> **syncNow**(): `Promise`\<`void`\>

Defined in: src/sync.ts:19

Performs an immediate synchronization check.

#### Returns

`Promise`\<`void`\>
