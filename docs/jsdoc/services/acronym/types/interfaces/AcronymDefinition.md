[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/acronym/types](../README.md) / AcronymDefinition

# Interface: AcronymDefinition

Defined in: src/services/acronym/types.ts:18

Definition of a single acronym entry in the catalog.

## Properties

### botName?

> `optional` **botName?**: `string`

Defined in: src/services/acronym/types.ts:20

Optional custom bot name to post with when replying for this acronym

***

### candidateWords

> **candidateWords**: `Record`\<`string`, `string`[]\>

Defined in: src/services/acronym/types.ts:22

Map of each letter in the acronym to candidate words
