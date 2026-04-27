[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [spotify](../README.md) / ISpotifyService

# Interface: ISpotifyService

Defined in: src/spotify.ts:20

Interface defining the operations for interacting with Spotify.

## Methods

### getCurrentlyPlaying()

> **getCurrentlyPlaying**(`user`): `Promise`\<[`TrackState`](TrackState.md) \| `null`\>

Defined in: src/spotify.ts:27

Fetches the currently playing track for the given user.

#### Parameters

##### user

[`User`](../../user/interfaces/User.md)

The user whose track we are fetching.

#### Returns

`Promise`\<[`TrackState`](TrackState.md) \| `null`\>

A promise resolving to the track state or null.
