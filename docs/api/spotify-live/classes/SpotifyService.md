[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [spotify-live](../README.md) / SpotifyService

# Class: SpotifyService

Defined in: src/spotify-live.ts:13

Live implementation of the Spotify service.

## Implements

- [`ISpotifyService`](../../spotify/interfaces/ISpotifyService.md)

## Constructors

### Constructor

> **new SpotifyService**(`config`): `SpotifyService`

Defined in: src/spotify-live.ts:22

Constructs a new SpotifyService.

#### Parameters

##### config

[`AppConfig`](../../config/interfaces/AppConfig.md)

The application configuration.

#### Returns

`SpotifyService`

## Methods

### getCurrentlyPlaying()

> **getCurrentlyPlaying**(`user`): `Promise`\<[`TrackState`](../../spotify/interfaces/TrackState.md) \| `null`\>

Defined in: src/spotify-live.ts:78

Fetches the currently playing track from the live Spotify API for a given user.

#### Parameters

##### user

[`User`](../../user/interfaces/User.md)

The user whose track we are fetching.

#### Returns

`Promise`\<[`TrackState`](../../spotify/interfaces/TrackState.md) \| `null`\>

The track state or null if nothing is playing/valid.

#### Implementation of

[`ISpotifyService`](../../spotify/interfaces/ISpotifyService.md).[`getCurrentlyPlaying`](../../spotify/interfaces/ISpotifyService.md#getcurrentlyplaying)
