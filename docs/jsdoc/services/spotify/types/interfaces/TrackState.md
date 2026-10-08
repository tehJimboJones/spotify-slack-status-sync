[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/spotify/types](../README.md) / TrackState

# Interface: TrackState

Defined in: [src/services/spotify/types.ts:35](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/spotify/types.ts#L35)

Represents the current Spotify playback state.

## Remarks

A unified DTO representing either a currently playing music track or a podcast episode, abstracted from raw Spotify API responses.

### Relationships
```mermaid
graph TD
TrackState([TrackState])
ISpotifyService[ISpotifyService] -.->|Returns| TrackState
SyncService[SyncService] -.->|Consumes| TrackState
```

## Example

```typescript
const state: TrackState = { isPlaying: true, title: 'Song', artist: 'Artist' };
```

## Properties

### artistName?

> `optional` **artistName?**: `string`

Defined in: [src/services/spotify/types.ts:38](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/spotify/types.ts#L38)

***

### isPlaying

> **isPlaying**: `boolean`

Defined in: [src/services/spotify/types.ts:36](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/spotify/types.ts#L36)

***

### songName?

> `optional` **songName?**: `string`

Defined in: [src/services/spotify/types.ts:37](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/spotify/types.ts#L37)

***

### type?

> `optional` **type?**: `"track"` \| `"episode"`

Defined in: [src/services/spotify/types.ts:39](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/spotify/types.ts#L39)
