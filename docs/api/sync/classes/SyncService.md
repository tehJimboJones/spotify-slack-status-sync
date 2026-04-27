[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [sync](../README.md) / SyncService

# Class: SyncService

Defined in: src/sync.ts:25

Service responsible for syncing Spotify playback state to Slack status.

## Implements

- [`ISyncService`](../interfaces/ISyncService.md)

## Constructors

### Constructor

> **new SyncService**(`spotify`, `slack`, `userService`, `config`): `SyncService`

Defined in: src/sync.ts:37

Constructs a new SyncService.

#### Parameters

##### spotify

[`ISpotifyService`](../../spotify/interfaces/ISpotifyService.md)

The Spotify service.

##### slack

[`ISlackService`](../../slack/interfaces/ISlackService.md)

The Slack service.

##### userService

[`IUserService`](../../user/interfaces/IUserService.md)

The User service.

##### config

[`AppConfig`](../../config/interfaces/AppConfig.md)

The application configuration.

#### Returns

`SyncService`

## Methods

### start()

> **start**(): `void`

Defined in: src/sync.ts:47

Starts the polling loop to continuously synchronize state.

#### Returns

`void`

#### Implementation of

[`ISyncService`](../interfaces/ISyncService.md).[`start`](../interfaces/ISyncService.md#start)

***

### stop()

> **stop**(): `void`

Defined in: src/sync.ts:61

Stops the polling loop.

#### Returns

`void`

#### Implementation of

[`ISyncService`](../interfaces/ISyncService.md).[`stop`](../interfaces/ISyncService.md#stop)

***

### syncNow()

> **syncNow**(): `Promise`\<`void`\>

Defined in: src/sync.ts:74

Checks the current Spotify state and updates Slack if it has changed.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the sync is complete.

#### Implementation of

[`ISyncService`](../interfaces/ISyncService.md).[`syncNow`](../interfaces/ISyncService.md#syncnow)
