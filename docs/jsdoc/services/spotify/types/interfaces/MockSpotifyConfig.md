[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/spotify/types](../README.md) / MockSpotifyConfig

# Interface: MockSpotifyConfig

Defined in: [src/services/spotify/types.ts:87](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/spotify/types.ts#L87)

Configuration options for the MockSpotifyService.

## Remarks

Allows tests to dynamically configure the behavior of the mocked Spotify service, such as simulating playback or forcing errors.

### Relationships
```mermaid
graph TD
MockSpotifyConfig([MockSpotifyConfig])
MockSpotifyService[MockSpotifyService] -.->|Consumes| MockSpotifyConfig
```

## Example

```typescript
const config: MockSpotifyConfig = { simulateError: true };
```

## Properties

### initialState?

> `optional` **initialState?**: [`TrackState`](TrackState.md) \| `null`

Defined in: [src/services/spotify/types.ts:88](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/spotify/types.ts#L88)
