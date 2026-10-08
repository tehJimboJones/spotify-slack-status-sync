[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/sync/types](../README.md) / ISyncService

# Interface: ISyncService

Defined in: [src/services/sync/types.ts:33](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/sync/types.ts#L33)

Interface for the status synchronization orchestrator.

## Remarks

Defines the contract for starting and stopping the background process that synchronizes Spotify playback state with Slack profiles.

### Relationships
```mermaid
graph TD
ISyncService([ISyncService])
SyncService[SyncService] -->|Implements| ISyncService
App[App Bootstrap] -->|Uses| ISyncService
```

## Example

```typescript
syncService.startSync();
```

## Methods

### start()

> **start**(): `void`

Defined in: [src/services/sync/types.ts:34](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/sync/types.ts#L34)

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Defined in: [src/services/sync/types.ts:35](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/sync/types.ts#L35)

#### Returns

`void`

***

### syncNow()

> **syncNow**(): `Promise`\<`void`\>

Defined in: [src/services/sync/types.ts:36](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/sync/types.ts#L36)

#### Returns

`Promise`\<`void`\>
