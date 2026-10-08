[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/acronym/types](../README.md) / AcronymConfig

# Interface: AcronymConfig

Defined in: src/services/acronym/types.ts:49

Runtime configuration state for the acronym guessing feature.

## Properties

### channels

> **channels**: `string`[]

Defined in: src/services/acronym/types.ts:55

List of Slack channel IDs where the bot listens

***

### enabledAcronyms

> **enabledAcronyms**: `string`[]

Defined in: src/services/acronym/types.ts:57

List of acronyms actively enabled for listening

***

### id?

> `optional` **id?**: `number`

Defined in: src/services/acronym/types.ts:51

Database record identifier

***

### isEnabled

> **isEnabled**: `boolean`

Defined in: src/services/acronym/types.ts:53

Whether guessing behavior is currently active
