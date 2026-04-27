[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [spotify](../README.md) / MockSpotifyService

# Class: MockSpotifyService

Defined in: src/spotify.ts:40

A mock implementation of the Spotify service for testing and initial development.

## Implements

- [`ISpotifyService`](../interfaces/ISpotifyService.md)

## Constructors

### Constructor

> **new MockSpotifyService**(`config?`): `MockSpotifyService`

Defined in: src/spotify.ts:48

Constructs a new MockSpotifyService.

#### Parameters

##### config?

[`MockSpotifyConfig`](../interfaces/MockSpotifyConfig.md)

Optional configuration with an initial state.

#### Returns

`MockSpotifyService`

## Methods

### getCurrentlyPlaying()

> **getCurrentlyPlaying**(`user`): `Promise`\<[`TrackState`](../interfaces/TrackState.md) \| `null`\>

Defined in: src/spotify.ts:58

Simulates fetching the currently playing track for a user.

#### Parameters

##### user

[`User`](../../user/interfaces/User.md)

The user whose track we are fetching.

#### Returns

`Promise`\<[`TrackState`](../interfaces/TrackState.md) \| `null`\>

A promise resolving to the track state or null.

#### Implementation of

[`ISpotifyService`](../interfaces/ISpotifyService.md).[`getCurrentlyPlaying`](../interfaces/ISpotifyService.md#getcurrentlyplaying)

***

### setMockState()

> **setMockState**(`state`): `void`

Defined in: src/spotify.ts:72

Dynamically sets the simulated state for testing purposes.

#### Parameters

##### state

[`TrackState`](../interfaces/TrackState.md) \| `null`

The new track state to simulate.

#### Returns

`void`
