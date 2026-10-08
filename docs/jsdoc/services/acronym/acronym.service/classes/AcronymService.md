[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/acronym/acronym.service](../README.md) / AcronymService

# Class: AcronymService

Defined in: src/services/acronym/acronym.service.ts:27

Concrete implementation of IAcronymService.

## Implements

- [`IAcronymService`](../../types/interfaces/IAcronymService.md)

## Constructors

### Constructor

> **new AcronymService**(`configRepository`, `catalogSource`): `AcronymService`

Defined in: src/services/acronym/acronym.service.ts:30

#### Parameters

##### configRepository

[`IAcronymConfigRepository`](../../types/interfaces/IAcronymConfigRepository.md)

##### catalogSource

`string` \| [`AcronymCatalog`](../../types/type-aliases/AcronymCatalog.md)

#### Returns

`AcronymService`

## Methods

### addEnabledAcronyms()

> **addEnabledAcronyms**(`acronyms`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/acronym.service.ts:202

Enables additional acronyms to listen for

#### Parameters

##### acronyms

`string`[]

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`addEnabledAcronyms`](../../types/interfaces/IAcronymService.md#addenabledacronyms)

***

### addMonitoredChannels()

> **addMonitoredChannels**(`channels`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/acronym.service.ts:176

Adds channels to the monitored list

#### Parameters

##### channels

`string`[]

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`addMonitoredChannels`](../../types/interfaces/IAcronymService.md#addmonitoredchannels)

***

### generateGuess()

> **generateGuess**(`acronym`): [`AcronymGuessResult`](../../types/interfaces/AcronymGuessResult.md)

Defined in: src/services/acronym/acronym.service.ts:128

Generates a random guess for a given acronym

#### Parameters

##### acronym

`string`

#### Returns

[`AcronymGuessResult`](../../types/interfaces/AcronymGuessResult.md)

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`generateGuess`](../../types/interfaces/IAcronymService.md#generateguess)

***

### getAvailableAcronyms()

> **getAvailableAcronyms**(): `string`[]

Defined in: src/services/acronym/acronym.service.ts:124

Returns the list of all available acronym keys from the catalog

#### Returns

`string`[]

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`getAvailableAcronyms`](../../types/interfaces/IAcronymService.md#getavailableacronyms)

***

### getAvailableCatalog()

> **getAvailableCatalog**(): [`AcronymCatalog`](../../types/type-aliases/AcronymCatalog.md)

Defined in: src/services/acronym/acronym.service.ts:120

Returns the full loaded catalog

#### Returns

[`AcronymCatalog`](../../types/type-aliases/AcronymCatalog.md)

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`getAvailableCatalog`](../../types/interfaces/IAcronymService.md#getavailablecatalog)

***

### getConfig()

> **getConfig**(): `Promise`\<[`AcronymConfig`](../../types/interfaces/AcronymConfig.md)\>

Defined in: src/services/acronym/acronym.service.ts:243

Gets the full configuration state

#### Returns

`Promise`\<[`AcronymConfig`](../../types/interfaces/AcronymConfig.md)\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`getConfig`](../../types/interfaces/IAcronymService.md#getconfig)

***

### getEnabledAcronyms()

> **getEnabledAcronyms**(): `Promise`\<`string`[]\>

Defined in: src/services/acronym/acronym.service.ts:197

Retrieves the list of currently enabled acronyms

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`getEnabledAcronyms`](../../types/interfaces/IAcronymService.md#getenabledacronyms)

***

### getMonitoredChannels()

> **getMonitoredChannels**(): `Promise`\<`string`[]\>

Defined in: src/services/acronym/acronym.service.ts:166

Retrieves the list of currently monitored channels

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`getMonitoredChannels`](../../types/interfaces/IAcronymService.md#getmonitoredchannels)

***

### isChannelMonitored()

> **isChannelMonitored**(`channelId`): `Promise`\<`boolean`\>

Defined in: src/services/acronym/acronym.service.ts:171

Checks if a specific channel is being monitored

#### Parameters

##### channelId

`string`

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`isChannelMonitored`](../../types/interfaces/IAcronymService.md#ischannelmonitored)

***

### isGuessingActive()

> **isGuessingActive**(): `Promise`\<`boolean`\>

Defined in: src/services/acronym/acronym.service.ts:157

Checks if the guessing behavior is currently active

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`isGuessingActive`](../../types/interfaces/IAcronymService.md#isguessingactive)

***

### removeEnabledAcronyms()

> **removeEnabledAcronyms**(`acronyms`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/acronym.service.ts:219

Disables acronyms from listening

#### Parameters

##### acronyms

`string`[]

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`removeEnabledAcronyms`](../../types/interfaces/IAcronymService.md#removeenabledacronyms)

***

### removeMonitoredChannels()

> **removeMonitoredChannels**(`channels`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/acronym.service.ts:183

Removes channels from the monitored list

#### Parameters

##### channels

`string`[]

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`removeMonitoredChannels`](../../types/interfaces/IAcronymService.md#removemonitoredchannels)

***

### setEnabledAcronyms()

> **setEnabledAcronyms**(`acronyms`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/acronym.service.ts:227

Replaces the enabled acronyms list

#### Parameters

##### acronyms

`string`[]

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`setEnabledAcronyms`](../../types/interfaces/IAcronymService.md#setenabledacronyms)

***

### setGuessingActive()

> **setGuessingActive**(`active`): `Promise`\<`void`\>

Defined in: src/services/acronym/acronym.service.ts:162

Activates or deactivates guessing behavior

#### Parameters

##### active

`boolean`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`setGuessingActive`](../../types/interfaces/IAcronymService.md#setguessingactive)

***

### setMonitoredChannels()

> **setMonitoredChannels**(`channels`): `Promise`\<`string`[]\>

Defined in: src/services/acronym/acronym.service.ts:191

Replaces the monitored channels list

#### Parameters

##### channels

`string`[]

#### Returns

`Promise`\<`string`[]\>

#### Implementation of

[`IAcronymService`](../../types/interfaces/IAcronymService.md).[`setMonitoredChannels`](../../types/interfaces/IAcronymService.md#setmonitoredchannels)
