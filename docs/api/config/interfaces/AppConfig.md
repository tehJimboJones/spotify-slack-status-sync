[**spotify-status-bot**](../../README.md)

***

[spotify-status-bot](../../README.md) / [config](../README.md) / AppConfig

# Interface: AppConfig

Defined in: src/config.ts:13

Represents the structured application configuration.

## Properties

### bot

> **bot**: `object`

Defined in: src/config.ts:28

Bot behavior configuration

#### pausedEmoji

> **pausedEmoji**: `string`

#### pollIntervalMs

> **pollIntervalMs**: `number`

#### port

> **port**: `number`

#### statusEmoji

> **statusEmoji**: `string`

#### statusFormat

> **statusFormat**: `string`

***

### db

> **db**: `object`

Defined in: src/config.ts:35

#### dialect

> **dialect**: `"mysql"` \| `"sqlite"`

#### host

> **host**: `string`

#### name

> **name**: `string`

#### pass

> **pass**: `string`

#### port

> **port**: `number`

#### storage?

> `optional` **storage?**: `string`

#### user

> **user**: `string`

***

### slack

> **slack**: `object`

Defined in: src/config.ts:22

Slack API configuration credentials

#### appToken?

> `optional` **appToken?**: `string`

#### signingSecret

> **signingSecret**: `string`

#### userToken

> **userToken**: `string`

***

### spotify

> **spotify**: `object`

Defined in: src/config.ts:15

Spotify API configuration credentials

#### clientId

> **clientId**: `string`

#### clientSecret

> **clientSecret**: `string`

#### redirectUri

> **redirectUri**: `string`

#### refreshToken

> **refreshToken**: `string`
