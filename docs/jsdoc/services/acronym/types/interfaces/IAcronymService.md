[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/acronym/types](../README.md) / IAcronymService

# Interface: IAcronymService

Defined in: src/services/acronym/types.ts:77

Core service contract for managing acronyms, guessing, and channel monitoring.

## Methods

### addEnabledAcronyms()

> **addEnabledAcronyms**(`acronyms`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/types.ts:101

Enables additional acronyms to listen for

#### Parameters

##### acronyms

`string`[]

#### Returns

`Promise`\<`string`[]\>

***

### addMonitoredChannels()

> **addMonitoredChannels**(`channels`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/types.ts:93

Adds channels to the monitored list

#### Parameters

##### channels

`string`[]

#### Returns

`Promise`\<`string`[]\>

***

### generateGuess()

> **generateGuess**(`acronym`): [`AcronymGuessResult`](AcronymGuessResult.md)

Defined in: src/services/acronym/types.ts:83

Generates a random guess for a given acronym

#### Parameters

##### acronym

`string`

#### Returns

[`AcronymGuessResult`](AcronymGuessResult.md)

***

### getAvailableAcronyms()

> **getAvailableAcronyms**(): `string`[]

Defined in: src/services/acronym/types.ts:81

Returns the list of all available acronym keys from the catalog

#### Returns

`string`[]

***

### getAvailableCatalog()

> **getAvailableCatalog**(): [`AcronymCatalog`](../type-aliases/AcronymCatalog.md)

Defined in: src/services/acronym/types.ts:79

Returns the full loaded catalog

#### Returns

[`AcronymCatalog`](../type-aliases/AcronymCatalog.md)

***

### getConfig()

> **getConfig**(): `Promise`\<[`AcronymConfig`](AcronymConfig.md)\>

Defined in: src/services/acronym/types.ts:107

Gets the full configuration state

#### Returns

`Promise`\<[`AcronymConfig`](AcronymConfig.md)\>

***

### getEnabledAcronyms()

> **getEnabledAcronyms**(): `Promise`\<`string`[]\>

Defined in: src/services/acronym/types.ts:99

Retrieves the list of currently enabled acronyms

#### Returns

`Promise`\<`string`[]\>

***

### getMonitoredChannels()

> **getMonitoredChannels**(): `Promise`\<`string`[]\>

Defined in: src/services/acronym/types.ts:89

Retrieves the list of currently monitored channels

#### Returns

`Promise`\<`string`[]\>

***

### isChannelMonitored()

> **isChannelMonitored**(`channelId`): `Promise`\<`boolean`\>

Defined in: src/services/acronym/types.ts:91

Checks if a specific channel is being monitored

#### Parameters

##### channelId

`string`

#### Returns

`Promise`\<`boolean`\>

***

### isGuessingActive()

> **isGuessingActive**(): `Promise`\<`boolean`\>

Defined in: src/services/acronym/types.ts:85

Checks if the guessing behavior is currently active

#### Returns

`Promise`\<`boolean`\>

***

### removeEnabledAcronyms()

> **removeEnabledAcronyms**(`acronyms`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/types.ts:103

Disables acronyms from listening

#### Parameters

##### acronyms

`string`[]

#### Returns

`Promise`\<`string`[]\>

***

### removeMonitoredChannels()

> **removeMonitoredChannels**(`channels`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/types.ts:95

Removes channels from the monitored list

#### Parameters

##### channels

`string`[]

#### Returns

`Promise`\<`string`[]\>

***

### setEnabledAcronyms()

> **setEnabledAcronyms**(`acronyms`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/types.ts:105

Replaces the enabled acronyms list

#### Parameters

##### acronyms

`string`[]

#### Returns

`Promise`\<`string`[]\>

***

### setGuessingActive()

> **setGuessingActive**(`active`): `Promise`\<`void`\>

Defined in: src/services/acronym/types.ts:87

Activates or deactivates guessing behavior

#### Parameters

##### active

`boolean`

#### Returns

`Promise`\<`void`\>

***

### setMonitoredChannels()

> **setMonitoredChannels**(`channels`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/types.ts:97

Replaces the monitored channels list

#### Parameters

##### channels

`string`[]

#### Returns

`Promise`\<`string`[]\>
