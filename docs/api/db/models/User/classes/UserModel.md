[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [db/models/User](../README.md) / UserModel

# Class: UserModel

Defined in: src/db/models/User.ts:8

Represents a user of the Spotify Status Bot.

## Extends

- `Model`\<`UserModel`\>

## Implements

- [`User`](../../../../user/interfaces/User.md)

## Constructors

### Constructor

> **new UserModel**(`values?`, `options?`): `UserModel`

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:21

#### Parameters

##### values?

`Optional`\<`UserModel`, `NullishPropertiesOf`\<`UserModel`\>\>

##### options?

`BuildOptions`

#### Returns

`UserModel`

#### Inherited from

`Model<UserModel>.constructor`

## Properties

### ~~\_attributes~~

> **\_attributes**: `UserModel`

Defined in: node\_modules/sequelize/types/model.d.ts:1889

A dummy variable that doesn't exist on the real object. This exists so
Typescript can infer the type of the attributes in static functions. Don't
try to access this!

Before using these, I'd tried typing out the functions without them, but
Typescript fails to infer `TAttributes` in signatures like the below.

```ts
public static findOne<M extends Model<TAttributes>, TAttributes>(
  this: { new(): M },
  options: NonNullFindOptions<TAttributes>
): Promise<M>;
```

#### Deprecated

This property will become a Symbol in v7 to prevent collisions.
Use Attributes<Model> instead of this property to be forward-compatible.

#### Inherited from

`Model._attributes`

***

### ~~\_creationAttributes~~

> **\_creationAttributes**: `UserModel`

Defined in: node\_modules/sequelize/types/model.d.ts:1903

A similar dummy variable that doesn't exist on the real object. Do not
try to access this in real code.

#### Deprecated

This property will become a Symbol in v7 to prevent collisions.
Use CreationAttributes<Model> instead of this property to be forward-compatible.

#### Inherited from

`Model._creationAttributes`

***

### \_model

> **\_model**: `Model`

Defined in: node\_modules/sequelize/types/hooks.d.ts:99

A dummy variable that doesn't exist on the real object. This exists so
Typescript can infer the type of the attributes in static functions. Don't
try to access this!

#### Inherited from

`Model._model`

***

### createdAt?

> `optional` **createdAt?**: `any`

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:15

#### Inherited from

`Model.createdAt`

***

### dataValues

> **dataValues**: `UserModel`

Defined in: node\_modules/sequelize/types/model.d.ts:1894

Object that contains underlying model data

#### Inherited from

`Model.dataValues`

***

### deletedAt?

> `optional` **deletedAt?**: `any`

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:17

#### Inherited from

`Model.deletedAt`

***

### id

> **id**: `string`

Defined in: src/db/models/User.ts:14

#### Implementation of

[`User`](../../../../user/interfaces/User.md).[`id`](../../../../user/interfaces/User.md#id)

#### Overrides

`Model.id`

***

### isNewRecord

> **isNewRecord**: `boolean`

Defined in: node\_modules/sequelize/types/model.d.ts:3071

Returns true if this instance has not yet been persisted to the database

#### Inherited from

`Model.isNewRecord`

***

### isSyncActive

> **isSyncActive**: `boolean`

Defined in: src/db/models/User.ts:40

#### Implementation of

[`User`](../../../../user/interfaces/User.md).[`isSyncActive`](../../../../user/interfaces/User.md#issyncactive)

***

### pausedEmoji

> **pausedEmoji**: `string`

Defined in: src/db/models/User.ts:61

#### Implementation of

[`User`](../../../../user/interfaces/User.md).[`pausedEmoji`](../../../../user/interfaces/User.md#pausedemoji)

***

### sequelize

> **sequelize**: `Sequelize`

Defined in: node\_modules/sequelize/types/model.d.ts:3076

A reference to the sequelize instance

#### Inherited from

`Model.sequelize`

***

### slackUserId

> **slackUserId**: `string`

Defined in: src/db/models/User.ts:21

#### Implementation of

[`User`](../../../../user/interfaces/User.md).[`slackUserId`](../../../../user/interfaces/User.md#slackuserid)

***

### slackUserToken

> **slackUserToken**: `string`

Defined in: src/db/models/User.ts:27

#### Implementation of

[`User`](../../../../user/interfaces/User.md).[`slackUserToken`](../../../../user/interfaces/User.md#slackusertoken)

***

### spotifyRefreshToken

> **spotifyRefreshToken**: `string`

Defined in: src/db/models/User.ts:33

#### Implementation of

[`User`](../../../../user/interfaces/User.md).[`spotifyRefreshToken`](../../../../user/interfaces/User.md#spotifyrefreshtoken)

***

### statusEmoji

> **statusEmoji**: `string`

Defined in: src/db/models/User.ts:54

#### Implementation of

[`User`](../../../../user/interfaces/User.md).[`statusEmoji`](../../../../user/interfaces/User.md#statusemoji)

***

### statusFormat

> **statusFormat**: `string`

Defined in: src/db/models/User.ts:47

#### Implementation of

[`User`](../../../../user/interfaces/User.md).[`statusFormat`](../../../../user/interfaces/User.md#statusformat)

***

### updatedAt?

> `optional` **updatedAt?**: `any`

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:16

#### Inherited from

`Model.updatedAt`

***

### version?

> `optional` **version?**: `any`

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:18

#### Inherited from

`Model.version`

***

### associations

> `readonly` `static` **associations**: `object`

Defined in: node\_modules/sequelize/types/model.d.ts:1921

An object hash from alias to association object

#### Index Signature

\[`key`: `string`\]: `Association`\<`Model`\<`any`, `any`\>, `Model`\<`any`, `any`\>\>

#### Inherited from

`Model.associations`

***

### isInitialized

> `static` **isInitialized**: `boolean`

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:19

#### Inherited from

`Model.isInitialized`

***

### options

> `readonly` `static` **options**: `InitOptions`

Defined in: node\_modules/sequelize/types/model.d.ts:1928

The options that the model was initialized with

#### Inherited from

`Model.options`

***

### primaryKeyAttribute

> `readonly` `static` **primaryKeyAttribute**: `string`

Defined in: node\_modules/sequelize/types/model.d.ts:1911

The name of the primary key attribute

#### Inherited from

`Model.primaryKeyAttribute`

***

### primaryKeyAttributes

> `readonly` `static` **primaryKeyAttributes**: readonly `string`[]

Defined in: node\_modules/sequelize/types/model.d.ts:1916

The name of the primary key attributes

#### Inherited from

`Model.primaryKeyAttributes`

***

### ~~rawAttributes~~

> `readonly` `static` **rawAttributes**: `object`

Defined in: node\_modules/sequelize/types/model.d.ts:1936

The attributes of the model.

#### Index Signature

\[`attribute`: `string`\]: `ModelAttributeColumnOptions`\<`Model`\<`any`, `any`\>\>

#### Deprecated

use [Model.getAttributes](#getattributes) for better typings.

#### Inherited from

`Model.rawAttributes`

***

### sequelize?

> `readonly` `static` `optional` **sequelize?**: `Sequelize`

Defined in: node\_modules/sequelize/types/model.d.ts:1948

Reference to the sequelize instance the model was initialized with

#### Inherited from

`Model.sequelize`

***

### tableName

> `readonly` `static` **tableName**: `string`

Defined in: node\_modules/sequelize/types/model.d.ts:1906

The name of the database table

#### Inherited from

`Model.tableName`

## Methods

### $add()

> **$add**\<`R`\>(`propertyKey`, `instances`, `options?`): `Promise`\<`unknown`\>

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:25

Adds relation between specified instances and source instance

#### Type Parameters

##### R

`R` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### propertyKey

`string`

##### instances

`string` \| `number` \| `string`[] \| `number`[] \| `R` \| `R`[]

##### options?

`AssociationActionOptions`

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

`Model.$add`

***

### $count()

> **$count**(`propertyKey`, `options?`): `Promise`\<`number`\>

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:38

Counts related instances (specified by propertyKey) of source instance

#### Parameters

##### propertyKey

`string`

##### options?

`AssociationCountOptions`

#### Returns

`Promise`\<`number`\>

#### Inherited from

`Model.$count`

***

### $create()

> **$create**\<`R`\>(`propertyKey`, `values`, `options?`): `Promise`\<`R`\>

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:42

Creates instances and relate them to source instance

#### Type Parameters

##### R

`R` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### propertyKey

`string`

##### values

`any`

##### options?

`AssociationCreateOptions`

#### Returns

`Promise`\<`R`\>

#### Inherited from

`Model.$create`

***

### $get()

> **$get**\<`K`\>(`propertyKey`, `options?`): `Promise`\<`$GetType`\<`UserModel`\[`K`\]\>\>

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:34

Returns related instance (specified by propertyKey) of source instance

#### Type Parameters

##### K

`K` *extends* keyof `UserModel`

#### Parameters

##### propertyKey

`K`

##### options?

`AssociationGetOptions`

#### Returns

`Promise`\<`$GetType`\<`UserModel`\[`K`\]\>\>

#### Inherited from

`Model.$get`

***

### $has()

> **$has**\<`R`\>(`propertyKey`, `instances`, `options?`): `Promise`\<`boolean`\>

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:46

Checks if specified instances is related to source instance

#### Type Parameters

##### R

`R` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### propertyKey

`string`

##### instances

`string` \| `number` \| `string`[] \| `number`[] \| `R` \| `R`[]

##### options?

`AssociationGetOptions`

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

`Model.$has`

***

### $remove()

> **$remove**\<`R`\>(`propertyKey`, `instances`, `options?`): `Promise`\<`any`\>

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:50

Removes specified instances from source instance

#### Type Parameters

##### R

`R` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### propertyKey

`string`

##### instances

`string` \| `number` \| `string`[] \| `number`[] \| `R` \| `R`[]

##### options?

`any`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`Model.$remove`

***

### $set()

> **$set**\<`R`\>(`propertyKey`, `instances`, `options?`): `Promise`\<`unknown`\>

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:30

Sets relation between specified instances and source instance
(replaces old relations)

#### Type Parameters

##### R

`R` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### propertyKey

keyof `UserModel`

##### instances

`string` \| `number` \| `string`[] \| `number`[] \| `R` \| `R`[] \| `null`

##### options?

`AssociationActionOptions`

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

`Model.$set`

***

### addHook()

#### Call Signature

> **addHook**\<`K`\>(`hookType`, `name`, `fn`): `this`

Defined in: node\_modules/sequelize/types/hooks.d.ts:168

Add a hook to the model

##### Type Parameters

###### K

`K` *extends* keyof `SequelizeHooks`\<`M`, `TModelAttributes`, `TCreationAttributes`\>

##### Parameters

###### hookType

`K`

###### name

`string`

Provide a name for the hook function. It can be used to remove the hook later or to order
  hooks based on some sort of priority system in the future.

###### fn

`SequelizeHooks`\<`Model`\<`any`, `any`\>, `UserModel`, `UserModel`\>\[`K`\]

##### Returns

`this`

##### Inherited from

`Model.addHook`

#### Call Signature

> **addHook**\<`K`\>(`hookType`, `fn`): `this`

Defined in: node\_modules/sequelize/types/hooks.d.ts:173

Add a hook to the model

##### Type Parameters

###### K

`K` *extends* keyof `SequelizeHooks`\<`M`, `TModelAttributes`, `TCreationAttributes`\>

##### Parameters

###### hookType

`K`

###### fn

`SequelizeHooks`\<`Model`\<`UserModel`, `UserModel`\>, `UserModel`, `UserModel`\>\[`K`\]

##### Returns

`this`

##### Inherited from

`Model.addHook`

***

### changed()

#### Call Signature

> **changed**\<`K`\>(`key`): `boolean`

Defined in: node\_modules/sequelize/types/model.d.ts:3151

If changed is called with a string it will return a boolean indicating whether the value of that key in
`dataValues` is different from the value in `_previousDataValues`.

If changed is called without an argument, it will return an array of keys that have changed.

If changed is called with two arguments, it will set the property to `dirty`.

If changed is called without an argument and no keys have changed, it will return `false`.

##### Type Parameters

###### K

`K` *extends* keyof `UserModel`

##### Parameters

###### key

`K`

##### Returns

`boolean`

##### Inherited from

`Model.changed`

#### Call Signature

> **changed**\<`K`\>(`key`, `dirty`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:3152

If changed is called with a string it will return a boolean indicating whether the value of that key in
`dataValues` is different from the value in `_previousDataValues`.

If changed is called without an argument, it will return an array of keys that have changed.

If changed is called with two arguments, it will set the property to `dirty`.

If changed is called without an argument and no keys have changed, it will return `false`.

##### Type Parameters

###### K

`K` *extends* keyof `UserModel`

##### Parameters

###### key

`K`

###### dirty

`boolean`

##### Returns

`void`

##### Inherited from

`Model.changed`

#### Call Signature

> **changed**(): `false` \| `string`[]

Defined in: node\_modules/sequelize/types/model.d.ts:3153

If changed is called with a string it will return a boolean indicating whether the value of that key in
`dataValues` is different from the value in `_previousDataValues`.

If changed is called without an argument, it will return an array of keys that have changed.

If changed is called with two arguments, it will set the property to `dirty`.

If changed is called without an argument and no keys have changed, it will return `false`.

##### Returns

`false` \| `string`[]

##### Inherited from

`Model.changed`

***

### decrement()

> **decrement**\<`K`\>(`fields`, `options?`): `Promise`\<`UserModel`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3257

Decrement the value of one or more columns. This is done in the database, which means it does not use
the values currently stored on the Instance. The decrement is done using a
```sql
SET column = column - X
```
query. To get the correct value after an decrement into the Instance you should do a reload.

```js
instance.decrement('number') // decrement number by 1
instance.decrement(['number', 'count'], { by: 2 }) // decrement number and count by 2
instance.decrement({ answer: 42, tries: 1}, { by: 2 }) // decrement answer by 42, and tries by 1.
                                                       // `by` is ignored, since each column has its own
                                                       // value
```

#### Type Parameters

##### K

`K` *extends* keyof `UserModel`

#### Parameters

##### fields

`K` \| `Partial`\<`UserModel`\> \| readonly `K`[]

If a string is provided, that column is decremented by the value of `by` given in options.
              If an array is provided, the same is true for each column.
              If and object is provided, each column is decremented by the value given

##### options?

`IncrementDecrementOptionsWithBy`\<`UserModel`\>

#### Returns

`Promise`\<`UserModel`\>

#### Inherited from

`Model.decrement`

***

### destroy()

> **destroy**(`options?`): `Promise`\<`void`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3205

Destroy the row corresponding to this instance. Depending on your setting for paranoid, the row will
either be completely deleted, or have its deletedAt timestamp set to the current time.

#### Parameters

##### options?

`InstanceDestroyOptions`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`Model.destroy`

***

### equals()

> **equals**(`other`): `boolean`

Defined in: node\_modules/sequelize/types/model.d.ts:3265

Check whether all values of this and `other` Instance are the same

#### Parameters

##### other

`this`

#### Returns

`boolean`

#### Inherited from

`Model.equals`

***

### equalsOneOf()

> **equalsOneOf**(`others`): `boolean`

Defined in: node\_modules/sequelize/types/model.d.ts:3270

Check if this is equal to one of `others` by calling equals

#### Parameters

##### others

readonly `UserModel`[]

#### Returns

`boolean`

#### Inherited from

`Model.equalsOneOf`

***

### get()

#### Call Signature

> **get**(`options?`): `UserModel`

Defined in: node\_modules/sequelize/types/model.d.ts:3108

If no key is given, returns all values of the instance, also invoking virtual getters.

If key is given and a field or virtual getter is present for the key it will call that getter - else it
will return the value for key.

##### Parameters

###### options?

###### clone?

`boolean`

###### plain?

`boolean`

If set to true, included instances will be returned as plain objects

##### Returns

`UserModel`

##### Inherited from

`Model.get`

#### Call Signature

> **get**\<`K`\>(`key`, `options?`): `UserModel`\[`K`\]

Defined in: node\_modules/sequelize/types/model.d.ts:3109

If no key is given, returns all values of the instance, also invoking virtual getters.

If key is given and a field or virtual getter is present for the key it will call that getter - else it
will return the value for key.

##### Type Parameters

###### K

`K` *extends* keyof `UserModel`

##### Parameters

###### key

`K`

###### options?

###### clone?

`boolean`

###### plain?

`boolean`

If set to true, included instances will be returned as plain objects

##### Returns

`UserModel`\[`K`\]

##### Inherited from

`Model.get`

#### Call Signature

> **get**(`key`, `options?`): `unknown`

Defined in: node\_modules/sequelize/types/model.d.ts:3110

If no key is given, returns all values of the instance, also invoking virtual getters.

If key is given and a field or virtual getter is present for the key it will call that getter - else it
will return the value for key.

##### Parameters

###### key

`string`

###### options?

###### clone?

`boolean`

###### plain?

`boolean`

If set to true, included instances will be returned as plain objects

##### Returns

`unknown`

##### Inherited from

`Model.get`

***

### getDataValue()

> **getDataValue**\<`K`\>(`key`): `UserModel`\[`K`\]

Defined in: node\_modules/sequelize/types/model.d.ts:3093

Get the value of the underlying data value

#### Type Parameters

##### K

`K` *extends* keyof `UserModel`

#### Parameters

##### key

`K`

#### Returns

`UserModel`\[`K`\]

#### Inherited from

`Model.getDataValue`

***

### hasHook()

> **hasHook**\<`K`\>(`hookType`): `boolean`

Defined in: node\_modules/sequelize/types/hooks.d.ts:186

Check whether the mode has any hooks of this type

#### Type Parameters

##### K

`K` *extends* keyof `SequelizeHooks`\<`M`, `TModelAttributes`, `TCreationAttributes`\>

#### Parameters

##### hookType

`K`

#### Returns

`boolean`

#### Inherited from

`Model.hasHook`

***

### hasHooks()

> **hasHooks**\<`K`\>(`hookType`): `boolean`

Defined in: node\_modules/sequelize/types/hooks.d.ts:187

#### Type Parameters

##### K

`K` *extends* keyof `SequelizeHooks`\<`M`, `TModelAttributes`, `TCreationAttributes`\>

#### Parameters

##### hookType

`K`

#### Returns

`boolean`

#### Inherited from

`Model.hasHooks`

***

### increment()

> **increment**\<`K`\>(`fields`, `options?`): `Promise`\<`UserModel`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3232

Increment the value of one or more columns. This is done in the database, which means it does not use
the values currently stored on the Instance. The increment is done using a
```sql
SET column = column + X
```
query. To get the correct value after an increment into the Instance you should do a reload.

```js
instance.increment('number') // increment number by 1
instance.increment(['number', 'count'], { by: 2 }) // increment number and count by 2
instance.increment({ answer: 42, tries: 1}, { by: 2 }) // increment answer by 42, and tries by 1.
                                                       // `by` is ignored, since each column has its own
                                                       // value
```

#### Type Parameters

##### K

`K` *extends* keyof `UserModel`

#### Parameters

##### fields

`K` \| `Partial`\<`UserModel`\> \| readonly `K`[]

If a string is provided, that column is incremented by the value of `by` given in options.
              If an array is provided, the same is true for each column.
              If and object is provided, each column is incremented by the value given.

##### options?

`IncrementDecrementOptionsWithBy`\<`UserModel`\>

#### Returns

`Promise`\<`UserModel`\>

#### Inherited from

`Model.increment`

***

### isSoftDeleted()

> **isSoftDeleted**(): `boolean`

Defined in: node\_modules/sequelize/types/model.d.ts:3286

Helper method to determine if a instance is "soft deleted". This is
particularly useful if the implementer renamed the deletedAt attribute to
something different. This method requires paranoid to be enabled.

Throws an error if paranoid is not enabled.

#### Returns

`boolean`

#### Inherited from

`Model.isSoftDeleted`

***

### previous()

#### Call Signature

> **previous**(): `Partial`\<`TModelAttributes`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3158

Returns the previous value for key from `_previousDataValues`.

##### Returns

`Partial`\<`TModelAttributes`\>

##### Inherited from

`Model.previous`

#### Call Signature

> **previous**\<`K`\>(`key`): `UserModel`\[`K`\] \| `undefined`

Defined in: node\_modules/sequelize/types/model.d.ts:3159

Returns the previous value for key from `_previousDataValues`.

##### Type Parameters

###### K

`K` *extends* keyof `UserModel`

##### Parameters

###### key

`K`

##### Returns

`UserModel`\[`K`\] \| `undefined`

##### Inherited from

`Model.previous`

***

### reload()

> **reload**(`options?`): `Promise`\<`UserModel`\>

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:51

Refresh the current instance in-place, i.e. update the object with current data from the DB and return
the same object. This is different from doing a `find(Instance.id)`, because that would create and
return a new instance. With this method, all references to the Instance are updated with the new data
and no new objects are created.

#### Parameters

##### options?

`FindOptions`\<`any`\>

#### Returns

`Promise`\<`UserModel`\>

#### Inherited from

`Model.reload`

***

### removeHook()

> **removeHook**\<`K`\>(`hookType`, `name`): `this`

Defined in: node\_modules/sequelize/types/hooks.d.ts:178

Remove hook from the model

#### Type Parameters

##### K

`K` *extends* keyof `SequelizeHooks`\<`M`, `TModelAttributes`, `TCreationAttributes`\>

#### Parameters

##### hookType

`K`

##### name

`string`

#### Returns

`this`

#### Inherited from

`Model.removeHook`

***

### restore()

> **restore**(`options?`): `Promise`\<`void`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3210

Restore the row corresponding to this instance. Only available for paranoid models.

#### Parameters

##### options?

`InstanceRestoreOptions`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`Model.restore`

***

### save()

> **save**(`options?`): `Promise`\<`UserModel`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3170

Validates this instance, and if the validation passes, persists it to the database.

Returns a Promise that resolves to the saved instance (or rejects with a `Sequelize.ValidationError`, which will have a property for each of the fields for which the validation failed, with the error message for that field).

This method is optimized to perform an UPDATE only into the fields that changed. If nothing has changed, no SQL query will be performed.

This method is not aware of eager loaded associations. In other words, if some other model instance (child) was eager loaded with this instance (parent), and you change something in the child, calling `save()` will simply ignore the change that happened on the child.

#### Parameters

##### options?

`SaveOptions`\<`UserModel`\>

#### Returns

`Promise`\<`UserModel`\>

#### Inherited from

`Model.save`

***

### set()

#### Call Signature

> **set**\<`K`\>(`key`, `value`, `options?`): `this`

Defined in: node\_modules/sequelize/types/model.d.ts:3136

Set is used to update values on the instance (the sequelize representation of the instance that is,
remember that nothing will be persisted before you actually call `save`). In its most basic form `set`
will update a value stored in the underlying `dataValues` object. However, if a custom setter function
is defined for the key, that function will be called instead. To bypass the setter, you can pass `raw:
true` in the options object.

If set is called with an object, it will loop over the object, and call set recursively for each key,
value pair. If you set raw to true, the underlying dataValues will either be set directly to the object
passed, or used to extend dataValues, if dataValues already contain values.

When set is called, the previous value of the field is stored and sets a changed flag(see `changed`).

Set can also be used to build instances for associations, if you have values for those.
When using set with associations you need to make sure the property key matches the alias of the
association while also making sure that the proper include options have been set (from .build() or
.findOne())

If called with a dot.seperated key on a JSON/JSONB attribute it will set the value nested and flag the
entire object as changed.

##### Type Parameters

###### K

`K` *extends* keyof `UserModel`

##### Parameters

###### key

`K`

###### value

`UserModel`\[`K`\]

###### options?

`SetOptions`

##### Returns

`this`

##### Inherited from

`Model.set`

#### Call Signature

> **set**(`keys`, `options?`): `this`

Defined in: node\_modules/sequelize/types/model.d.ts:3137

Set is used to update values on the instance (the sequelize representation of the instance that is,
remember that nothing will be persisted before you actually call `save`). In its most basic form `set`
will update a value stored in the underlying `dataValues` object. However, if a custom setter function
is defined for the key, that function will be called instead. To bypass the setter, you can pass `raw:
true` in the options object.

If set is called with an object, it will loop over the object, and call set recursively for each key,
value pair. If you set raw to true, the underlying dataValues will either be set directly to the object
passed, or used to extend dataValues, if dataValues already contain values.

When set is called, the previous value of the field is stored and sets a changed flag(see `changed`).

Set can also be used to build instances for associations, if you have values for those.
When using set with associations you need to make sure the property key matches the alias of the
association while also making sure that the proper include options have been set (from .build() or
.findOne())

If called with a dot.seperated key on a JSON/JSONB attribute it will set the value nested and flag the
entire object as changed.

##### Parameters

###### keys

`Partial`\<`TModelAttributes`\>

###### options?

`SetOptions`

##### Returns

`this`

##### Inherited from

`Model.set`

***

### setAttributes()

#### Call Signature

> **setAttributes**\<`K`\>(`key`, `value`, `options?`): `this`

Defined in: node\_modules/sequelize/types/model.d.ts:3138

##### Type Parameters

###### K

`K` *extends* keyof `UserModel`

##### Parameters

###### key

`K`

###### value

`UserModel`\[`K`\]

###### options?

`SetOptions`

##### Returns

`this`

##### Inherited from

`Model.setAttributes`

#### Call Signature

> **setAttributes**(`keys`, `options?`): `this`

Defined in: node\_modules/sequelize/types/model.d.ts:3139

##### Parameters

###### keys

`Partial`\<`TModelAttributes`\>

###### options?

`SetOptions`

##### Returns

`this`

##### Inherited from

`Model.setAttributes`

***

### setDataValue()

> **setDataValue**\<`K`\>(`key`, `value`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:3098

Update the underlying data value

#### Type Parameters

##### K

`K` *extends* keyof `UserModel`

#### Parameters

##### key

`K`

##### value

`UserModel`\[`K`\]

#### Returns

`void`

#### Inherited from

`Model.setDataValue`

***

### toJSON()

#### Call Signature

> **toJSON**\<`T`\>(): `T`

Defined in: node\_modules/sequelize/types/model.d.ts:3276

Convert the instance to a JSON representation. Proxies to calling `get` with no keys. This means get all
values gotten from the DB, and apply all custom getters.

##### Type Parameters

###### T

`T` *extends* `UserModel`

##### Returns

`T`

##### Inherited from

`Model.toJSON`

#### Call Signature

> **toJSON**(): `object`

Defined in: node\_modules/sequelize/types/model.d.ts:3277

Convert the instance to a JSON representation. Proxies to calling `get` with no keys. This means get all
values gotten from the DB, and apply all custom getters.

##### Returns

`object`

##### Inherited from

`Model.toJSON`

***

### update()

#### Call Signature

> **update**\<`K`\>(`key`, `value`, `options?`): `Promise`\<`UserModel`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3193

This is the same as calling `set` and then calling `save`.

##### Type Parameters

###### K

`K` *extends* keyof `UserModel`

##### Parameters

###### key

`K`

###### value

`Col` \| `Fn` \| `Literal` \| `UserModel`\[`K`\]

###### options?

`InstanceUpdateOptions`\<`UserModel`\>

##### Returns

`Promise`\<`UserModel`\>

##### Inherited from

`Model.update`

#### Call Signature

> **update**(`keys`, `options?`): `Promise`\<`UserModel`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3194

This is the same as calling `set` and then calling `save`.

##### Parameters

###### keys

###### _attributes?

`UserModel` \| `Col` \| `Fn` \| `Literal`

A dummy variable that doesn't exist on the real object. This exists so
Typescript can infer the type of the attributes in static functions. Don't
try to access this!

Before using these, I'd tried typing out the functions without them, but
Typescript fails to infer `TAttributes` in signatures like the below.

```ts
public static findOne<M extends Model<TAttributes>, TAttributes>(
  this: { new(): M },
  options: NonNullFindOptions<TAttributes>
): Promise<M>;
```

**Deprecated**

This property will become a Symbol in v7 to prevent collisions.
Use Attributes<Model> instead of this property to be forward-compatible.

###### _creationAttributes?

`UserModel` \| `Col` \| `Fn` \| `Literal`

A similar dummy variable that doesn't exist on the real object. Do not
try to access this in real code.

**Deprecated**

This property will become a Symbol in v7 to prevent collisions.
Use CreationAttributes<Model> instead of this property to be forward-compatible.

###### _model?

`Col` \| `Fn` \| `Literal` \| `Model`\<`UserModel`, `UserModel`\>

A dummy variable that doesn't exist on the real object. This exists so
Typescript can infer the type of the attributes in static functions. Don't
try to access this!

###### $add?

(\<`R`\>(`propertyKey`, `instances`, `options?`) => `Promise`\<`unknown`\>) \| `Col` \| `Fn` \| `Literal`

###### $count?

((`propertyKey`, `options?`) => `Promise`\<`number`\>) \| `Col` \| `Fn` \| `Literal`

###### $create?

(\<`R`\>(`propertyKey`, `values`, `options?`) => `Promise`\<`R`\>) \| `Col` \| `Fn` \| `Literal`

###### $get?

`Col` \| `Fn` \| `Literal` \| (\<`K`\>(`propertyKey`, `options?`) => `Promise`\<`$GetType`\<`UserModel`\[`K`\]\>\>)

###### $has?

(\<`R`\>(`propertyKey`, `instances`, `options?`) => `Promise`\<`boolean`\>) \| `Col` \| `Fn` \| `Literal`

###### $remove?

(\<`R`\>(`propertyKey`, `instances`, `options?`) => `Promise`\<`any`\>) \| `Col` \| `Fn` \| `Literal`

###### $set?

`Col` \| `Fn` \| `Literal` \| (\<`R`\>(`propertyKey`, `instances`, `options?`) => `Promise`\<`unknown`\>)

###### addHook?

`Col` \| `Fn` \| `Literal` \| (\{\<`K`\>(`hookType`, `name`, `fn`): `this`; \<`K`\>(`hookType`, `fn`): `this`; \})

###### changed?

`Col` \| `Fn` \| `Literal` \| (\{\<`K`\>(`key`): `boolean`; \<`K`\>(`key`, `dirty`): `void`; (): `false` \| `string`[]; \})

###### createdAt?

`any`

###### dataValues?

`UserModel` \| `Col` \| `Fn` \| `Literal`

Object that contains underlying model data

###### decrement?

`Col` \| `Fn` \| `Literal` \| (\<`K`\>(`fields`, `options?`) => `Promise`\<`UserModel`\>)

###### deletedAt?

`any`

###### destroy?

`Col` \| `Fn` \| `Literal` \| ((`options?`) => `Promise`\<`void`\>)

###### equals?

`Col` \| `Fn` \| `Literal` \| ((`other`) => `boolean`)

###### equalsOneOf?

`Col` \| `Fn` \| `Literal` \| ((`others`) => `boolean`)

###### get?

`Col` \| `Fn` \| `Literal` \| (\{(`options?`): `UserModel`; \<`K`\>(`key`, `options?`): `UserModel`\[`K`\]; (`key`, `options?`): `unknown`; \})

###### getDataValue?

`Col` \| `Fn` \| `Literal` \| (\<`K`\>(`key`) => `UserModel`\[`K`\])

###### hasHook?

`Col` \| `Fn` \| `Literal` \| (\<`K`\>(`hookType`) => `boolean`)

###### hasHooks?

`Col` \| `Fn` \| `Literal` \| (\<`K`\>(`hookType`) => `boolean`)

###### id?

`string` \| `Col` \| `Fn` \| `Literal`

###### increment?

`Col` \| `Fn` \| `Literal` \| (\<`K`\>(`fields`, `options?`) => `Promise`\<`UserModel`\>)

###### isNewRecord?

`boolean` \| `Col` \| `Fn` \| `Literal`

Returns true if this instance has not yet been persisted to the database

###### isSoftDeleted?

`Col` \| `Fn` \| `Literal` \| (() => `boolean`)

###### isSyncActive?

`boolean` \| `Col` \| `Fn` \| `Literal`

###### pausedEmoji?

`string` \| `Col` \| `Fn` \| `Literal`

###### previous?

`Col` \| `Fn` \| `Literal` \| (\{(): `Partial`\<`TModelAttributes`\>; \<`K`\>(`key`): `UserModel`\[`K`\] \| `undefined`; \})

###### reload?

`Col` \| `Fn` \| `Literal` \| ((`options?`) => `Promise`\<`UserModel`\>)

###### removeHook?

`Col` \| `Fn` \| `Literal` \| (\<`K`\>(`hookType`, `name`) => `this`)

###### restore?

`Col` \| `Fn` \| `Literal` \| ((`options?`) => `Promise`\<`void`\>)

###### save?

`Col` \| `Fn` \| `Literal` \| ((`options?`) => `Promise`\<`UserModel`\>)

###### sequelize?

`Sequelize` \| `Col` \| `Fn` \| `Literal`

A reference to the sequelize instance

###### set?

`Col` \| `Fn` \| `Literal` \| (\{\<`K`\>(`key`, `value`, `options?`): `this`; (`keys`, `options?`): `this`; \})

###### setAttributes?

`Col` \| `Fn` \| `Literal` \| (\{\<`K`\>(`key`, `value`, `options?`): `this`; (`keys`, `options?`): `this`; \})

###### setDataValue?

`Col` \| `Fn` \| `Literal` \| (\<`K`\>(`key`, `value`) => `void`)

###### slackUserId?

`string` \| `Col` \| `Fn` \| `Literal`

###### slackUserToken?

`string` \| `Col` \| `Fn` \| `Literal`

###### spotifyRefreshToken?

`string` \| `Col` \| `Fn` \| `Literal`

###### statusEmoji?

`string` \| `Col` \| `Fn` \| `Literal`

###### statusFormat?

`string` \| `Col` \| `Fn` \| `Literal`

###### toJSON?

`Col` \| `Fn` \| `Literal` \| (\{\<`T`\>(): `T`; (): `object`; \})

###### update?

`Col` \| `Fn` \| `Literal` \| (\{\<`K`\>(`key`, `value`, `options?`): `Promise`\<`UserModel`\>; (`keys`, `options?`): `Promise`\<`UserModel`\>; \})

###### updatedAt?

`any`

###### validate?

((`options?`) => `Promise`\<`void`\>) \| `Col` \| `Fn` \| `Literal`

###### version?

`any`

###### where?

(() => `object`) \| `Col` \| `Fn` \| `Literal`

###### options?

`InstanceUpdateOptions`\<`UserModel`\>

##### Returns

`Promise`\<`UserModel`\>

##### Inherited from

`Model.update`

***

### validate()

> **validate**(`options?`): `Promise`\<`void`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3188

Validate the attribute of this instance according to validation rules set in the model definition.

Emits null if and only if validation successful; otherwise an Error instance containing
{ field name : [error msgs] } entries.

#### Parameters

##### options?

`ValidationOptions`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`Model.validate`

***

### where()

> **where**(): `object`

Defined in: node\_modules/sequelize/types/model.d.ts:3088

Get an object representing the query for this instance, use with `options.where`

#### Returns

`object`

#### Inherited from

`Model.where`

***

### addHook()

#### Call Signature

> `static` **addHook**\<`H`, `K`\>(`this`, `hookType`, `name`, `fn`): `HooksCtor`\<`H`\>

Defined in: node\_modules/sequelize/types/hooks.d.ts:123

Add a hook to the model

##### Type Parameters

###### H

`H` *extends* `Hooks`\<`Model`\<`any`, `any`\>, `any`, `any`\>

###### K

`K` *extends* keyof `SequelizeHooks`\<`H`\[`"_model"`\], `Attributes`\<`H`\>, `CreationAttributes`\<`H`\>\>

##### Parameters

###### this

`HooksStatic`\<`H`\>

###### hookType

`K`

###### name

`string`

Provide a name for the hook function. It can be used to remove the hook later or to order
  hooks based on some sort of priority system in the future.

###### fn

`SequelizeHooks`\<`H`\[`"_model"`\], `Attributes`\<`H`\>, `CreationAttributes`\<`H`\>\>\[`K`\]

##### Returns

`HooksCtor`\<`H`\>

##### Inherited from

`Model.addHook`

#### Call Signature

> `static` **addHook**\<`H`, `K`\>(`this`, `hookType`, `fn`): `HooksCtor`\<`H`\>

Defined in: node\_modules/sequelize/types/hooks.d.ts:132

Add a hook to the model

##### Type Parameters

###### H

`H` *extends* `Hooks`\<`Model`\<`any`, `any`\>, `any`, `any`\>

###### K

`K` *extends* keyof `SequelizeHooks`\<`H`\[`"_model"`\], `Attributes`\<`H`\>, `CreationAttributes`\<`H`\>\>

##### Parameters

###### this

`HooksStatic`\<`H`\>

###### hookType

`K`

###### fn

`SequelizeHooks`\<`H`\[`"_model"`\], `Attributes`\<`H`\>, `CreationAttributes`\<`H`\>\>\[`K`\]

##### Returns

`HooksCtor`\<`H`\>

##### Inherited from

`Model.addHook`

***

### addScope()

#### Call Signature

> `static` **addScope**\<`M`\>(`this`, `name`, `scope`, `options?`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2115

Add a new scope to the model

This is especially useful for adding scopes with includes, when the model you want to
include is not available at the time this model is defined. By default this will throw an
error if a scope with that name already exists. Pass `override: true` in the options
object to silence this error.

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### scope

`FindOptions`\<`Attributes`\<`M`\>\>

###### options?

`AddScopeOptions`

##### Returns

`void`

##### Inherited from

`Model.addScope`

#### Call Signature

> `static` **addScope**\<`M`\>(`this`, `name`, `scope`, `options?`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2121

Add a new scope to the model

This is especially useful for adding scopes with includes, when the model you want to
include is not available at the time this model is defined. By default this will throw an
error if a scope with that name already exists. Pass `override: true` in the options
object to silence this error.

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### scope

(...`args`) => `FindOptions`\<`Attributes`\<`M`\>\>

###### options?

`AddScopeOptions`

##### Returns

`void`

##### Inherited from

`Model.addScope`

***

### afterBulkCreate()

#### Call Signature

> `static` **afterBulkCreate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2755

A hook that is run after creating instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instances`, `options`) => `HookReturn`

A callback function that is called with instances, options

##### Returns

`void`

##### Inherited from

`Model.afterBulkCreate`

#### Call Signature

> `static` **afterBulkCreate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2760

A hook that is run after creating instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instances`, `options`) => `HookReturn`

A callback function that is called with instances, options

##### Returns

`void`

##### Inherited from

`Model.afterBulkCreate`

***

### afterBulkDestroy()

#### Call Signature

> `static` **afterBulkDestroy**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2785

A hook that is run after destroying instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.afterBulkDestroy`

#### Call Signature

> `static` **afterBulkDestroy**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2789

A hook that is run after destroying instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.afterBulkDestroy`

***

### afterBulkSync()

#### Call Signature

> `static` **afterBulkSync**(`name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2913

A hook that is run after sequelize.sync call

##### Parameters

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options passed to sequelize.sync

##### Returns

`void`

##### Inherited from

`Model.afterBulkSync`

#### Call Signature

> `static` **afterBulkSync**(`fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2914

A hook that is run after sequelize.sync call

##### Parameters

###### fn

(`options`) => `HookReturn`

A callback function that is called with options passed to sequelize.sync

##### Returns

`void`

##### Inherited from

`Model.afterBulkSync`

***

### afterBulkUpdate()

#### Call Signature

> `static` **afterBulkUpdate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2815

A hook that is run after updating instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.afterBulkUpdate`

#### Call Signature

> `static` **afterBulkUpdate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2819

A hook that is run after updating instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.afterBulkUpdate`

***

### afterCreate()

#### Call Signature

> `static` **afterCreate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2627

A hook that is run after creating a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with attributes, options

##### Returns

`void`

##### Inherited from

`Model.afterCreate`

#### Call Signature

> `static` **afterCreate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2632

A hook that is run after creating a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with attributes, options

##### Returns

`void`

##### Inherited from

`Model.afterCreate`

***

### afterDestroy()

#### Call Signature

> `static` **afterDestroy**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2659

A hook that is run after destroying a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.afterDestroy`

#### Call Signature

> `static` **afterDestroy**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2664

A hook that is run after destroying a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.afterDestroy`

***

### afterFind()

#### Call Signature

> `static` **afterFind**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2890

A hook that is run after a find (select) query

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instancesOrInstance`, `options`) => `HookReturn`

A callback function that is called with instance(s), options

##### Returns

`void`

##### Inherited from

`Model.afterFind`

#### Call Signature

> `static` **afterFind**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2895

A hook that is run after a find (select) query

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instancesOrInstance`, `options`) => `HookReturn`

A callback function that is called with instance(s), options

##### Returns

`void`

##### Inherited from

`Model.afterFind`

***

### afterSave()

#### Call Signature

> `static` **afterSave**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2723

A hook that is run after creating or updating a single instance, It proxies `afterCreate` and `afterUpdate`

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.afterSave`

#### Call Signature

> `static` **afterSave**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2728

A hook that is run after creating or updating a single instance, It proxies `afterCreate` and `afterUpdate`

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.afterSave`

***

### afterSync()

#### Call Signature

> `static` **afterSync**(`name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2929

A hook that is run after Model.sync call

##### Parameters

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options passed to Model.sync

##### Returns

`void`

##### Inherited from

`Model.afterSync`

#### Call Signature

> `static` **afterSync**(`fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2930

A hook that is run after Model.sync call

##### Parameters

###### fn

(`options`) => `HookReturn`

A callback function that is called with options passed to Model.sync

##### Returns

`void`

##### Inherited from

`Model.afterSync`

***

### afterUpdate()

#### Call Signature

> `static` **afterUpdate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2691

A hook that is run after updating a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.afterUpdate`

#### Call Signature

> `static` **afterUpdate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2696

A hook that is run after updating a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.afterUpdate`

***

### afterValidate()

#### Call Signature

> `static` **afterValidate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2595

A hook that is run after validation

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.afterValidate`

#### Call Signature

> `static` **afterValidate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2600

A hook that is run after validation

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.afterValidate`

***

### aggregate()

> `static` **aggregate**\<`T`, `M`\>(`this`, `field`, `aggregateFunction`, `options?`): `Promise`\<`T`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2230

Run an aggregation method on the specified field

#### Type Parameters

##### T

`T`

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### field

keyof `Attributes`\<`M`\> \| `"*"`

The field to aggregate over. Can be a field name or *

##### aggregateFunction

`string`

The function to use for aggregation, e.g. sum, max etc.

##### options?

`AggregateOptions`\<`T`, `Attributes`\<`M`\>\>

Query options. See sequelize.query for full options

#### Returns

`Promise`\<`T`\>

Returns the aggregate result cast to `options.dataType`, unless `options.plain` is false, in
    which case the complete data result is returned.

#### Inherited from

`Model.aggregate`

***

### beforeBulkCreate()

#### Call Signature

> `static` **beforeBulkCreate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2739

A hook that is run before creating instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instances`, `options`) => `HookReturn`

A callback function that is called with instances, options

##### Returns

`void`

##### Inherited from

`Model.beforeBulkCreate`

#### Call Signature

> `static` **beforeBulkCreate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2744

A hook that is run before creating instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instances`, `options`) => `HookReturn`

A callback function that is called with instances, options

##### Returns

`void`

##### Inherited from

`Model.beforeBulkCreate`

***

### beforeBulkDestroy()

#### Call Signature

> `static` **beforeBulkDestroy**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2771

A hook that is run before destroying instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeBulkDestroy`

#### Call Signature

> `static` **beforeBulkDestroy**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2774

A hook that is run before destroying instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeBulkDestroy`

***

### beforeBulkSync()

#### Call Signature

> `static` **beforeBulkSync**(`name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2905

A hook that is run before sequelize.sync call

##### Parameters

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options passed to sequelize.sync

##### Returns

`void`

##### Inherited from

`Model.beforeBulkSync`

#### Call Signature

> `static` **beforeBulkSync**(`fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2906

A hook that is run before sequelize.sync call

##### Parameters

###### fn

(`options`) => `HookReturn`

A callback function that is called with options passed to sequelize.sync

##### Returns

`void`

##### Inherited from

`Model.beforeBulkSync`

***

### beforeBulkUpdate()

#### Call Signature

> `static` **beforeBulkUpdate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2800

A hook that is run after updating instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeBulkUpdate`

#### Call Signature

> `static` **beforeBulkUpdate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2804

A hook that is run after updating instances in bulk

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeBulkUpdate`

***

### beforeCount()

#### Call Signature

> `static` **beforeCount**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2845

A hook that is run before a count query

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeCount`

#### Call Signature

> `static` **beforeCount**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2849

A hook that is run before a count query

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeCount`

***

### beforeCreate()

#### Call Signature

> `static` **beforeCreate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2611

A hook that is run before creating a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with attributes, options

##### Returns

`void`

##### Inherited from

`Model.beforeCreate`

#### Call Signature

> `static` **beforeCreate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2616

A hook that is run before creating a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with attributes, options

##### Returns

`void`

##### Inherited from

`Model.beforeCreate`

***

### beforeDestroy()

#### Call Signature

> `static` **beforeDestroy**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2643

A hook that is run before destroying a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.beforeDestroy`

#### Call Signature

> `static` **beforeDestroy**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2648

A hook that is run before destroying a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.beforeDestroy`

***

### beforeFind()

#### Call Signature

> `static` **beforeFind**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2830

A hook that is run before a find (select) query

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeFind`

#### Call Signature

> `static` **beforeFind**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2834

A hook that is run before a find (select) query

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeFind`

***

### beforeFindAfterExpandIncludeAll()

#### Call Signature

> `static` **beforeFindAfterExpandIncludeAll**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2860

A hook that is run before a find (select) query, after any { include: {all: ...} } options are expanded

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeFindAfterExpandIncludeAll`

#### Call Signature

> `static` **beforeFindAfterExpandIncludeAll**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2864

A hook that is run before a find (select) query, after any { include: {all: ...} } options are expanded

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeFindAfterExpandIncludeAll`

***

### beforeFindAfterOptions()

#### Call Signature

> `static` **beforeFindAfterOptions**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2875

A hook that is run before a find (select) query, after all option parsing is complete

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options

##### Returns

`void`

##### Inherited from

`Model.beforeFindAfterOptions`

#### Call Signature

> `static` **beforeFindAfterOptions**\<`M`\>(`this`, `fn`): `HookReturn`

Defined in: node\_modules/sequelize/types/model.d.ts:2879

A hook that is run before a find (select) query, after all option parsing is complete

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`options`) => `void`

A callback function that is called with options

##### Returns

`HookReturn`

##### Inherited from

`Model.beforeFindAfterOptions`

***

### beforeSave()

#### Call Signature

> `static` **beforeSave**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2707

A hook that is run before creating or updating a single instance, It proxies `beforeCreate` and `beforeUpdate`

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.beforeSave`

#### Call Signature

> `static` **beforeSave**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2712

A hook that is run before creating or updating a single instance, It proxies `beforeCreate` and `beforeUpdate`

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.beforeSave`

***

### beforeSync()

#### Call Signature

> `static` **beforeSync**(`name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2921

A hook that is run before Model.sync call

##### Parameters

###### name

`string`

###### fn

(`options`) => `HookReturn`

A callback function that is called with options passed to Model.sync

##### Returns

`void`

##### Inherited from

`Model.beforeSync`

#### Call Signature

> `static` **beforeSync**(`fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2922

A hook that is run before Model.sync call

##### Parameters

###### fn

(`options`) => `HookReturn`

A callback function that is called with options passed to Model.sync

##### Returns

`void`

##### Inherited from

`Model.beforeSync`

***

### beforeUpdate()

#### Call Signature

> `static` **beforeUpdate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2675

A hook that is run before updating a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.beforeUpdate`

#### Call Signature

> `static` **beforeUpdate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2680

A hook that is run before updating a single instance

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.beforeUpdate`

***

### beforeValidate()

#### Call Signature

> `static` **beforeValidate**\<`M`\>(`this`, `name`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2579

A hook that is run before validation

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### name

`string`

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.beforeValidate`

#### Call Signature

> `static` **beforeValidate**\<`M`\>(`this`, `fn`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2584

A hook that is run before validation

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fn

(`instance`, `options`) => `HookReturn`

A callback function that is called with instance, options

##### Returns

`void`

##### Inherited from

`Model.beforeValidate`

***

### belongsTo()

> `static` **belongsTo**\<`M`, `T`\>(`this`, `target`, `options?`): `BelongsTo`\<`M`, `T`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2954

Creates an association between this (the source) and the provided target. The foreign key is added on the
source.

Example: `Profile.belongsTo(User)`. This will add userId to the profile table.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

##### T

`T` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### target

`ModelStatic`\<`T`\>

The model that will be associated with hasOne relationship

##### options?

`BelongsToOptions`

Options for the association

#### Returns

`BelongsTo`\<`M`, `T`\>

#### Inherited from

`Model.belongsTo`

***

### belongsToMany()

> `static` **belongsToMany**\<`M`, `T`\>(`this`, `target`, `options`): `BelongsToMany`\<`M`, `T`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3064

Create an N:M association with a join table

```js
User.belongsToMany(Project)
Project.belongsToMany(User)
```
By default, the name of the join table will be source+target, so in this case projectsusers. This can be
overridden by providing either a string or a Model as `through` in the options.

If you use a through model with custom attributes, these attributes can be set when adding / setting new
associations in two ways. Consider users and projects from before with a join table that stores whether
the project has been started yet:
```js
class UserProjects extends Model {}
UserProjects.init({
  started: Sequelize.BOOLEAN
}, { sequelize });
User.belongsToMany(Project, { through: UserProjects })
Project.belongsToMany(User, { through: UserProjects })
```
```js
jan.addProject(homework, { started: false }) // The homework project is not started yet
jan.setProjects([makedinner, doshopping], { started: true}) // Both shopping and dinner has been started
```

If you want to set several target instances, but with different attributes you have to set the
attributes on the instance, using a property with the name of the through model:

```js
p1.userprojects {
  started: true
}
user.setProjects([p1, p2], {started: false}) // The default value is false, but p1 overrides that.
```

Similarily, when fetching through a join table with custom attributes, these attributes will be
available as an object with the name of the through model.
```js
user.getProjects().then(projects => {
  const p1 = projects[0]
  p1.userprojects.started // Is this project started yet?
})
```

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

##### T

`T` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### target

`ModelStatic`\<`T`\>

The model that will be associated with hasOne relationship

##### options

`BelongsToManyOptions`

Options for the association

#### Returns

`BelongsToMany`\<`M`, `T`\>

#### Inherited from

`Model.belongsToMany`

***

### build()

> `static` **build**\<`M`\>(`this`, `record?`, `options?`): `M`

Defined in: node\_modules/sequelize/types/model.d.ts:2341

Builds a new model instance. Values is an object of key value pairs, must be defined but can be empty.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### record?

`MakeNullishOptional`\<`M`\[`"_creationAttributes"`\]\>

##### options?

`BuildOptions`

#### Returns

`M`

#### Inherited from

`Model.build`

***

### bulkBuild()

> `static` **bulkBuild**\<`M`\>(`this`, `records`, `options?`): `M`[]

Defined in: node\_modules/sequelize/types/model.d.ts:2350

Undocumented bulkBuild

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### records

readonly `MakeNullishOptional`\<`M`\[`"_creationAttributes"`\]\>[]

##### options?

`BuildOptions`

#### Returns

`M`[]

#### Inherited from

`Model.bulkBuild`

***

### bulkCreate()

> `static` **bulkCreate**\<`M`\>(`this`, `records`, `options?`): `Promise`\<`M`[]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2441

Create and insert multiple instances in bulk.

The success handler is passed an array of instances, but please notice that these may not completely
represent the state of the rows in the DB. This is because MySQL and SQLite do not make it easy to
obtain
back automatically generated IDs and other default values in a way that can be mapped to multiple
records. To obtain Instances for the newly created values, you will need to query for them again.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### records

readonly `MakeNullishOptional`\<`M`\[`"_creationAttributes"`\]\>[]

List of objects (key/value pairs) to create instances from

##### options?

`BulkCreateOptions`\<`Attributes`\<`M`\>\>

#### Returns

`Promise`\<`M`[]\>

#### Inherited from

`Model.bulkCreate`

***

### count()

#### Call Signature

> `static` **count**\<`M`\>(`this`, `options`): `Promise`\<`GroupedCountResultItem`[]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2242

Count number of records if group by is used

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### options

###### attributes?

`FindAttributeOptions`

A list of the attributes that you want to select. To rename an attribute, you can pass an array, with
two elements - the first is the name of the attribute in the DB (or some kind of expression such as
`Sequelize.literal`, `Sequelize.fn` and so on), and the second is the name you want the attribute to
have in the returned instance

###### benchmark?

`boolean`

Pass query execution time in milliseconds as second argument to logging function (options.logging).

###### col?

`string`

The column to aggregate on.

###### distinct?

`boolean`

Apply COUNT(DISTINCT(col))

###### group

`GroupOption`

GROUP BY in sql
Used in conjunction with `attributes`.

**See**

Projectable

###### include?

`Includeable` \| `Includeable`[]

Include options. See `find` for details

###### logging?

`boolean` \| ((`sql`, `timing?`) => `void`)

A function that gets executed while running the query to log the sql.

###### paranoid?

`boolean`

If true, only non-deleted records will be returned. If false, both deleted and non-deleted records will
be returned. Only applies if `options.paranoid` is true for the model.

###### transaction?

`Transaction` \| `null`

Transaction to run query under

###### useMaster?

`boolean`

Force the query to use the write pool, regardless of the query type.

**Default**

```ts
false
```

###### where?

`WhereOptions`\<`Attributes`\<`M`\>\>

Attribute has to be matched for rows to be selected for the given action.

##### Returns

`Promise`\<`GroupedCountResultItem`[]\>

Returns count for each group and the projected attributes.

##### Inherited from

`Model.count`

#### Call Signature

> `static` **count**\<`M`\>(`this`, `options?`): `Promise`\<`number`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2254

Count the number of records matching the provided where clause.

If you provide an `include` option, the number of matching associations will be counted instead.

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### options?

`Omit`\<`CountOptions`\<`Attributes`\<`M`\>\>, `"group"`\>

##### Returns

`Promise`\<`number`\>

Returns count for each group and the projected attributes.

##### Inherited from

`Model.count`

***

### create()

> `static` **create**\<`M`, `O`\>(`this`, `values?`, `options?`): `Promise`\<`O` *extends* \{ `returning`: `false`; \} \| \{ `ignoreDuplicates`: `true`; \} ? `void` : `M`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2359

Builds a new model instance and calls save on it.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

##### O

`O` *extends* `CreateOptions`\<`Attributes`\<`M`\>\> = `CreateOptions`\<`Attributes`\<`M`\>\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### values?

`MakeNullishOptional`\<`M`\[`"_creationAttributes"`\]\>

##### options?

`O`

#### Returns

`Promise`\<`O` *extends* \{ `returning`: `false`; \} \| \{ `ignoreDuplicates`: `true`; \} ? `void` : `M`\>

#### Inherited from

`Model.create`

***

### decrement()

#### Call Signature

> `static` **decrement**\<`M`\>(`this`, `fields`, `options`): `Promise`\<\[`M`[], `number`\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2551

Decrements the value of one or more attributes.

Works like [Model.increment](#increment-1)

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fields

`AllowReadonlyArray`\<keyof `Attributes`\<`M`\>\>

If a string is provided, that column is incremented by the
  value of `by` given in options. If an array is provided, the same is true for each column.
  If an object is provided, each key is incremented by the corresponding value, `by` is ignored.

###### options

`IncrementDecrementOptionsWithBy`\<`Attributes`\<`M`\>\>

##### Returns

`Promise`\<\[`M`[], `number`\]\>

an array of affected rows or with affected count if `options.returning` is true, whenever supported by dialect

##### Since

4.36.0

##### Inherited from

`Model.decrement`

#### Call Signature

> `static` **decrement**\<`M`\>(`this`, `fields`, `options`): `Promise`\<\[`M`[], `number`\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2556

Decrements the value of one or more attributes.

Works like [Model.increment](#increment-1)

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fields

\{ \[key in string \| number \| symbol\]?: number \}

If a string is provided, that column is incremented by the
  value of `by` given in options. If an array is provided, the same is true for each column.
  If an object is provided, each key is incremented by the corresponding value, `by` is ignored.

###### options

`IncrementDecrementOptions`\<`Attributes`\<`M`\>\>

##### Returns

`Promise`\<\[`M`[], `number`\]\>

an array of affected rows or with affected count if `options.returning` is true, whenever supported by dialect

##### Since

4.36.0

##### Inherited from

`Model.decrement`

***

### describe()

> `static` **describe**(): `Promise`\<`object`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2566

Run a describe query on the table. The result will be return to the listener as a hash of attributes and
their types.

#### Returns

`Promise`\<`object`\>

#### Inherited from

`Model.describe`

***

### destroy()

> `static` **destroy**\<`M`\>(`this`, `options?`): `Promise`\<`number`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2460

Delete multiple instances, or set their deletedAt timestamp to the current time if `paranoid` is enabled.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### options?

`DestroyOptions`\<`Attributes`\<`M`\>\>

#### Returns

`Promise`\<`number`\>

Promise<number> The number of destroyed rows

#### Inherited from

`Model.destroy`

***

### drop()

> `static` **drop**(`options?`): `Promise`\<`void`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2021

Drop the table represented by this Model

#### Parameters

##### options?

`DropOptions`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`Model.drop`

***

### findAll()

> `static` **findAll**\<`M`\>(`this`, `options?`): `Promise`\<`M`[]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2190

Search for multiple instances.

__Simple search using AND and =__
```js
Model.findAll({
  where: {
    attr1: 42,
    attr2: 'cake'
  }
})
```
```sql
WHERE attr1 = 42 AND attr2 = 'cake'
```

__Using greater than, less than etc.__
```js

Model.findAll({
  where: {
    attr1: {
      gt: 50
    },
    attr2: {
      lte: 45
    },
    attr3: {
      in: [1,2,3]
    },
    attr4: {
      ne: 5
    }
  }
})
```
```sql
WHERE attr1 > 50 AND attr2 <= 45 AND attr3 IN (1,2,3) AND attr4 != 5
```
Possible options are: `[Op.ne], [Op.in], [Op.not], [Op.notIn], [Op.gte], [Op.gt], [Op.lte], [Op.lt], [Op.like], [Op.ilike]/[Op.iLike], [Op.notLike],
[Op.notILike], '..'/[Op.between], '!..'/[Op.notBetween], '&&'/[Op.overlap], '@>'/[Op.contains], '<@'/[Op.contained]`

__Queries using OR__
```js
Model.findAll({
  where: Sequelize.and(
    { name: 'a project' },
    Sequelize.or(
      { id: [1,2,3] },
      { id: { gt: 10 } }
    )
  )
})
```
```sql
WHERE name = 'a project' AND (id` IN (1,2,3) OR id > 10)
```

The success listener is called with an array of instances if the query succeeds.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### options?

`FindOptions`\<`Attributes`\<`M`\>\>

#### Returns

`Promise`\<`M`[]\>

#### See

#### Inherited from

`Model.findAll`

***

### findAndCountAll()

#### Call Signature

> `static` **findAndCountAll**\<`M`\>(`this`, `options?`): `Promise`\<\{ `count`: `number`; `rows`: `M`[]; \}\>

Defined in: node\_modules/sequelize/types/model.d.ts:2302

Find all the rows matching your query, within a specified offset / limit, and get the total number of
rows matching your query. This is very useful for paging

```js
Model.findAndCountAll({
  where: ...,
  limit: 12,
  offset: 12
}).then(result => {
  ...
})
```
In the above example, `result.rows` will contain rows 13 through 24, while `result.count` will return
the
total number of rows that matched your query.

When you add includes, only those which are required (either because they have a where clause, or
because
`required` is explicitly set to true on the include) will be added to the count part.

Suppose you want to find all users who have a profile attached:
```js
User.findAndCountAll({
  include: [
     { model: Profile, required: true}
  ],
  limit: 3
});
```
Because the include for `Profile` has `required` set it will result in an inner join, and only the users
who have a profile will be counted. If we remove `required` from the include, both users with and
without
profiles will be counted

This function also support grouping, when `group` is provided, the count will be an array of objects
containing the count for each group and the projected attributes.
```js
User.findAndCountAll({
  group: 'type'
});
```

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### options?

`Omit`\<`FindAndCountOptions`\<`Attributes`\<`M`\>\>, `"group"`\>

##### Returns

`Promise`\<\{ `count`: `number`; `rows`: `M`[]; \}\>

##### Inherited from

`Model.findAndCountAll`

#### Call Signature

> `static` **findAndCountAll**\<`M`\>(`this`, `options`): `Promise`\<\{ `count`: `GroupedCountResultItem`[]; `rows`: `M`[]; \}\>

Defined in: node\_modules/sequelize/types/model.d.ts:2306

Find all the rows matching your query, within a specified offset / limit, and get the total number of
rows matching your query. This is very useful for paging

```js
Model.findAndCountAll({
  where: ...,
  limit: 12,
  offset: 12
}).then(result => {
  ...
})
```
In the above example, `result.rows` will contain rows 13 through 24, while `result.count` will return
the
total number of rows that matched your query.

When you add includes, only those which are required (either because they have a where clause, or
because
`required` is explicitly set to true on the include) will be added to the count part.

Suppose you want to find all users who have a profile attached:
```js
User.findAndCountAll({
  include: [
     { model: Profile, required: true}
  ],
  limit: 3
});
```
Because the include for `Profile` has `required` set it will result in an inner join, and only the users
who have a profile will be counted. If we remove `required` from the include, both users with and
without
profiles will be counted

This function also support grouping, when `group` is provided, the count will be an array of objects
containing the count for each group and the projected attributes.
```js
User.findAndCountAll({
  group: 'type'
});
```

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### options

###### attributes?

`FindAttributeOptions`

A list of the attributes that you want to select. To rename an attribute, you can pass an array, with
two elements - the first is the name of the attribute in the DB (or some kind of expression such as
`Sequelize.literal`, `Sequelize.fn` and so on), and the second is the name you want the attribute to
have in the returned instance

###### benchmark?

`boolean`

Pass query execution time in milliseconds as second argument to logging function (options.logging).

###### bind?

`BindOrReplacements`

Either an object of named parameter bindings in the format `$param` or an array of unnamed
values to bind to `$1`, `$2`, etc in your SQL.

###### col?

`string`

The column to aggregate on.

###### distinct?

`boolean`

Apply COUNT(DISTINCT(col))

###### fieldMap?

`FieldMap`

Map returned fields to arbitrary names for SELECT query type if `options.fieldMaps` is present.

###### group

`GroupOption`

GROUP BY in sql
Used in conjunction with `attributes`.

**See**

Projectable

###### groupedLimit?

`unknown`

###### having?

`WhereOptions`\<`any`\>

Select group rows after groups and aggregates are computed.

###### include?

`Includeable` \| `Includeable`[]

Include options. See `find` for details

###### indexHints?

`IndexHint`[]

MySQL only.

###### instance?

`Model`\<`any`, `any`\>

A sequelize instance used to build the return instance

###### limit?

`number`

Limits how many items will be retrieved by the operation.

If `limit` and `include` are used together, Sequelize will turn the `subQuery` option on by default.
This is done to ensure that `limit` only impacts the Model on the same level as the `limit` option.

You can disable this behavior by explicitly setting `subQuery: false`, however `limit` will then
affect the total count of returned values, including eager-loaded associations, instead of just one table.

**Examples**

```ts
// in the following query, `limit` only affects the "User" model.
// This will return 2 users, each including all of their projects.
User.findAll({
  limit: 2,
  include: [User.associations.projects],
});
```

```ts
// in the following query, `limit` affects the total number of returned values, eager-loaded associations included.
// This may return 2 users, each with one project,
//  or 1 user with 2 projects.
User.findAll({
  limit: 2,
  include: [User.associations.projects],
  subQuery: false,
});
```

###### lock?

`boolean` \| `LOCK` \| \{ `level`: `LOCK`; `of`: `ModelStatic`\<`Model`\<`any`, `any`\>\>; \}

Lock the selected rows. Possible options are transaction.LOCK.UPDATE and transaction.LOCK.SHARE.
Postgres also supports transaction.LOCK.KEY_SHARE, transaction.LOCK.NO_KEY_UPDATE and specific model
locks with joins. See [transaction.LOCK for an example](transaction#lock)

###### logging?

`boolean` \| ((`sql`, `timing?`) => `void`)

A function that gets executed while running the query to log the sql.

###### mapToModel?

`boolean`

Map returned fields to model's fields if `options.model` or `options.instance` is present.
Mapping will occur before building the model instance.

###### nest?

`boolean`

If true, transforms objects with `.` separated property names into nested objects using
[dottie.js](https://github.com/mickhansen/dottie.js). For example { 'user.username': 'john' } becomes
{ user: { username: 'john' }}. When `nest` is true, the query type is assumed to be `'SELECT'`,
unless otherwise specified

**Default**

```ts
false
```

###### offset?

`number`

Skip the results;

###### order?

`Order`

Specifies an ordering. If a string is provided, it will be escaped. Using an array, you can provide
several columns / functions to order by. Each element can be further wrapped in a two-element array. The
first element is the column / function to order by, the second is the direction. For example:
`order: [['name', 'DESC']]`. In this way the column will be escaped, but the direction will not.

###### paranoid?

`boolean`

If true, only non-deleted records will be returned. If false, both deleted and non-deleted records will
be returned. Only applies if `options.paranoid` is true for the model.

###### plain?

`boolean`

Sets the query type to `SELECT` and return a single row

###### raw?

`boolean`

Return raw result. See sequelize.query for more information.

###### replacements?

`BindOrReplacements`

Either an object of named parameter replacements in the format `:param` or an array of unnamed
replacements to replace `?` in your SQL.

###### retry?

`Options`

###### skipLocked?

`boolean`

Skip locked rows. Only supported in Postgres.

###### subQuery?

`boolean`

Use sub queries (internal).

If unspecified, this will `true` by default if `limit` is specified, and `false` otherwise.
See FindOptions#limit for more information.

###### transaction?

`Transaction` \| `null`

Transaction to run query under

###### type?

`string`

The type of query you are executing. The query type affects how results are formatted before they are
passed back. The type is a string, but `Sequelize.QueryTypes` is provided as convenience shortcuts.

###### useMaster?

`boolean`

Force the query to use the write pool, regardless of the query type.

**Default**

```ts
false
```

###### where?

`WhereOptions`\<`Attributes`\<`M`\>\>

Attribute has to be matched for rows to be selected for the given action.

##### Returns

`Promise`\<\{ `count`: `GroupedCountResultItem`[]; `rows`: `M`[]; \}\>

##### Inherited from

`Model.findAndCountAll`

***

### findByPk()

#### Call Signature

> `static` **findByPk**\<`M`\>(`this`, `identifier`, `options`): `Promise`\<`M`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2198

Search for a single instance by its primary key. This applies LIMIT 1, so the listener will
always be called with a single instance.

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### identifier

`Identifier`

###### options

`Omit`\<`NonNullFindOptions`\<`Attributes`\<`M`\>\>, `"where"`\>

##### Returns

`Promise`\<`M`\>

##### Inherited from

`Model.findByPk`

#### Call Signature

> `static` **findByPk**\<`M`\>(`this`, `identifier?`, `options?`): `Promise`\<`M` \| `null`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2203

Search for a single instance by its primary key. This applies LIMIT 1, so the listener will
always be called with a single instance.

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### identifier?

`Identifier`

###### options?

`Omit`\<`FindOptions`\<`Attributes`\<`M`\>\>, `"where"`\>

##### Returns

`Promise`\<`M` \| `null`\>

##### Inherited from

`Model.findByPk`

***

### findCreateFind()

> `static` **findCreateFind**\<`M`\>(`this`, `options`): `Promise`\<\[`M`, `boolean`\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2400

A more performant findOrCreate that will not work under a transaction (at least not in postgres)
Will execute a find call, if empty then attempt to create, if unique constraint then attempt to find again

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### options

`FindOrCreateOptions`\<`Attributes`\<`M`\>, `MakeNullishOptional`\<`M`\[`"_creationAttributes"`\]\>\>

#### Returns

`Promise`\<\[`M`, `boolean`\]\>

#### Inherited from

`Model.findCreateFind`

***

### findOne()

#### Call Signature

> `static` **findOne**\<`M`\>(`this`, `options`): `Promise`\<`M`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2212

Search for a single instance. Returns the first instance found, or null if none can be found.

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### options

`NonNullFindOptions`\<`Attributes`\<`M`\>\>

##### Returns

`Promise`\<`M`\>

##### Inherited from

`Model.findOne`

#### Call Signature

> `static` **findOne**\<`M`\>(`this`, `options?`): `Promise`\<`M` \| `null`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2216

Search for a single instance. Returns the first instance found, or null if none can be found.

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### options?

`FindOptions`\<`Attributes`\<`M`\>\>

##### Returns

`Promise`\<`M` \| `null`\>

##### Inherited from

`Model.findOne`

***

### findOrBuild()

> `static` **findOrBuild**\<`M`\>(`this`, `options`): `Promise`\<\[`M`, `boolean`\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2372

Find a row that matches the query, or build (but don't save) the row if none is found.
The successful result of the promise will be (instance, initialized) - Make sure to use `.then(([...]))`

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### options

`FindOrBuildOptions`\<`Attributes`\<`M`\>, `MakeNullishOptional`\<`M`\[`"_creationAttributes"`\]\>\>

#### Returns

`Promise`\<\[`M`, `boolean`\]\>

#### Inherited from

`Model.findOrBuild`

***

### findOrCreate()

> `static` **findOrCreate**\<`M`\>(`this`, `options`): `Promise`\<\[`M`, `boolean`\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2391

Find a row that matches the query, or build and save the row if none is found
The successful result of the promise will be (instance, created) - Make sure to use `.then(([...]))`

If no transaction is passed in the `options` object, a new transaction will be created internally, to
prevent the race condition where a matching row is created by another connection after the find but
before the insert call. However, it is not always possible to handle this case in SQLite, specifically
if one transaction inserts and another tries to select before the first one has comitted. In this case,
an instance of sequelize.TimeoutError will be thrown instead. If a transaction is created, a savepoint
will be created instead, and any unique constraint violation will be handled internally.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### options

`FindOrCreateOptions`\<`Attributes`\<`M`\>, `MakeNullishOptional`\<`M`\[`"_creationAttributes"`\]\>\>

#### Returns

`Promise`\<\[`M`, `boolean`\]\>

#### Inherited from

`Model.findOrCreate`

***

### getAttributes()

> `static` **getAttributes**\<`M`\>(`this`): \{ readonly \[Key in string \| number \| symbol\]: ModelAttributeColumnOptions\<Model\<any, any\>\> \}

Defined in: node\_modules/sequelize/types/model.d.ts:1941

Returns the attributes of the model

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

#### Returns

\{ readonly \[Key in string \| number \| symbol\]: ModelAttributeColumnOptions\<Model\<any, any\>\> \}

#### Inherited from

`Model.getAttributes`

***

### getTableName()

> `static` **getTableName**(): `string` \| \{ `delimiter`: `string`; `schema`: `string`; `tableName`: `string`; \}

Defined in: node\_modules/sequelize/types/model.d.ts:2047

Get the tablename of the model, taking schema into account. The method will return The name as a string
if the model has no schema, or an object with `tableName`, `schema` and `delimiter` properties.

#### Returns

`string` \| \{ `delimiter`: `string`; `schema`: `string`; `tableName`: `string`; \}

#### Inherited from

`Model.getTableName`

***

### hasHook()

> `static` **hasHook**\<`H`\>(`this`, `hookType`): `boolean`

Defined in: node\_modules/sequelize/types/hooks.d.ts:153

Check whether the mode has any hooks of this type

#### Type Parameters

##### H

`H` *extends* `Hooks`\<`Model`\<`any`, `any`\>, `any`, `any`\>

#### Parameters

##### this

`HooksStatic`\<`H`\>

##### hookType

keyof `SequelizeHooks`\<`H`\[`"_model"`\], `Attributes`\<`H`\>, `CreationAttributes`\<`H`\>\>

#### Returns

`boolean`

#### Inherited from

`Model.hasHook`

***

### hasHooks()

> `static` **hasHooks**\<`H`\>(`this`, `hookType`): `boolean`

Defined in: node\_modules/sequelize/types/hooks.d.ts:157

#### Type Parameters

##### H

`H` *extends* `Hooks`\<`Model`\<`any`, `any`\>, `any`, `any`\>

#### Parameters

##### this

`HooksStatic`\<`H`\>

##### hookType

keyof `SequelizeHooks`\<`H`\[`"_model"`\], `Attributes`\<`H`\>, `CreationAttributes`\<`H`\>\>

#### Returns

`boolean`

#### Inherited from

`Model.hasHooks`

***

### hasMany()

> `static` **hasMany**\<`M`, `T`\>(`this`, `target`, `options?`): `HasMany`\<`M`, `T`\>

Defined in: node\_modules/sequelize/types/model.d.ts:3011

Create an association that is either 1:m or n:m.

```js
// Create a 1:m association between user and project
User.hasMany(Project)
```
```js
// Create a n:m association between user and project
User.hasMany(Project)
Project.hasMany(User)
```
By default, the name of the join table will be source+target, so in this case projectsusers. This can be
overridden by providing either a string or a Model as `through` in the options. If you use a through
model with custom attributes, these attributes can be set when adding / setting new associations in two
ways. Consider users and projects from before with a join table that stores whether the project has been
started yet:
```js
class UserProjects extends Model {}
UserProjects.init({
  started: Sequelize.BOOLEAN
}, { sequelize })
User.hasMany(Project, { through: UserProjects })
Project.hasMany(User, { through: UserProjects })
```
```js
jan.addProject(homework, { started: false }) // The homework project is not started yet
jan.setProjects([makedinner, doshopping], { started: true}) // Both shopping and dinner have been
started
```

If you want to set several target instances, but with different attributes you have to set the
attributes on the instance, using a property with the name of the through model:

```js
p1.userprojects {
  started: true
}
user.setProjects([p1, p2], {started: false}) // The default value is false, but p1 overrides that.
```

Similarily, when fetching through a join table with custom attributes, these attributes will be
available as an object with the name of the through model.
```js
user.getProjects().then(projects => {
  const p1 = projects[0]
  p1.userprojects.started // Is this project started yet?
})
```

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

##### T

`T` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### target

`ModelStatic`\<`T`\>

The model that will be associated with hasOne relationship

##### options?

`HasManyOptions`

Options for the association

#### Returns

`HasMany`\<`M`, `T`\>

#### Inherited from

`Model.hasMany`

***

### hasOne()

> `static` **hasOne**\<`M`, `T`\>(`this`, `target`, `options?`): `HasOne`\<`M`, `T`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2941

Creates an association between this (the source) and the provided target. The foreign key is added
on the target.

Example: `User.hasOne(Profile)`. This will add userId to the profile table.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

##### T

`T` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### target

`ModelStatic`\<`T`\>

The model that will be associated with hasOne relationship

##### options?

`HasOneOptions`

Options for the association

#### Returns

`HasOne`\<`M`, `T`\>

#### Inherited from

`Model.hasOne`

***

### increment()

#### Call Signature

> `static` **increment**\<`M`\>(`this`, `fields`, `options`): `Promise`\<\[`M`[], `number`\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2527

Increments the value of one or more attributes.

The increment is done using a `SET column = column + X WHERE foo = 'bar'` query.

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fields

`AllowReadonlyArray`\<keyof `Attributes`\<`M`\>\>

If a string is provided, that column is incremented by the
  value of `by` given in options. If an array is provided, the same is true for each column.
  If an object is provided, each key is incremented by the corresponding value, `by` is ignored.

###### options

`IncrementDecrementOptionsWithBy`\<`Attributes`\<`M`\>\>

##### Returns

`Promise`\<\[`M`[], `number`\]\>

an array of affected rows or with affected count if `options.returning` is true, whenever supported by dialect

##### Examples

```javascript
Model.increment('number', { where: { foo: 'bar' });
```

```javascript
Model.increment(['number', 'count'], { by: 2, where: { foo: 'bar' } });
```

```javascript
// `by` cannot be used, as each attribute specifies its own value
Model.increment({ answer: 42, tries: -1}, { where: { foo: 'bar' } });
```

##### Inherited from

`Model.increment`

#### Call Signature

> `static` **increment**\<`M`\>(`this`, `fields`, `options`): `Promise`\<\[`M`[], `number`\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2532

Increments the value of one or more attributes.

The increment is done using a `SET column = column + X WHERE foo = 'bar'` query.

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### fields

\{ \[key in string \| number \| symbol\]?: number \}

If a string is provided, that column is incremented by the
  value of `by` given in options. If an array is provided, the same is true for each column.
  If an object is provided, each key is incremented by the corresponding value, `by` is ignored.

###### options

`IncrementDecrementOptions`\<`Attributes`\<`M`\>\>

##### Returns

`Promise`\<\[`M`[], `number`\]\>

an array of affected rows or with affected count if `options.returning` is true, whenever supported by dialect

##### Examples

```javascript
Model.increment('number', { where: { foo: 'bar' });
```

```javascript
Model.increment(['number', 'count'], { by: 2, where: { foo: 'bar' } });
```

```javascript
// `by` cannot be used, as each attribute specifies its own value
Model.increment({ answer: 42, tries: -1}, { where: { foo: 'bar' } });
```

##### Inherited from

`Model.increment`

***

### init()

> `static` **init**\<`MS`, `M`\>(`this`, `attributes`, `options`): `MS`

Defined in: node\_modules/sequelize/types/model.d.ts:1993

Initialize a model, representing a table in the DB, with attributes and options.

The table columns are define by the hash that is given as the second argument. Each attribute of the hash represents a column. A short table definition might look like this:

```js
Project.init({
  columnA: {
    type: Sequelize.BOOLEAN,
    validate: {
      is: ['[a-z]','i'],        // will only allow letters
      max: 23,                  // only allow values <= 23
      isIn: {
        args: [['en', 'zh']],
        msg: "Must be English or Chinese"
      }
    },
    field: 'column_a'
    // Other attributes here
  },
  columnB: Sequelize.STRING,
  columnC: 'MY VERY OWN COLUMN TYPE'
}, {sequelize})

sequelize.models.modelName // The model will now be available in models under the class name
```

As shown above, column definitions can be either strings, a reference to one of the datatypes that are predefined on the Sequelize constructor, or an object that allows you to specify both the type of the column, and other attributes such as default values, foreign key constraints and custom setters and getters.

For a list of possible data types, see https://sequelize.org/master/en/latest/docs/models-definition/#data-types

For more about getters and setters, see https://sequelize.org/master/en/latest/docs/models-definition/#getters-setters

For more about instance and class methods, see https://sequelize.org/master/en/latest/docs/models-definition/#expansion-of-models

For more about validation, see https://sequelize.org/master/en/latest/docs/models-definition/#validations

#### Type Parameters

##### MS

`MS` *extends* `ModelStatic`\<`Model`\<`any`, `any`\>\>

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`MS`

##### attributes

`ModelAttributes`\<`M`, `Optional`\<`Attributes`\<`M`\>, `BrandedKeysOf`\<`Attributes`\<`M`\>, *typeof* `ForeignKeyBrand`\>\>\>

An object, where each attribute is a column of the table. Each column can be either a DataType, a
 string or a type-description object, with the properties described below:

##### options

`InitOptions`\<`M`\>

These options are merged with the default define options provided to the Sequelize constructor

#### Returns

`MS`

Return the initialized model

#### Inherited from

`Model.init`

***

### initialize()

> `static` **initialize**\<`MS`, `M`\>(`attributes`, `options`): `MS`

Defined in: node\_modules/sequelize-typescript/dist/model/model/model.d.ts:20

#### Type Parameters

##### MS

`MS` *extends* `ModelStatic`\<`Model`\<`any`, `any`\>\>

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### attributes

`ModelAttributes`

##### options

`InitOptions`

#### Returns

`MS`

#### Inherited from

`Model.initialize`

***

### max()

> `static` **max**\<`T`, `M`\>(`this`, `field`, `options?`): `Promise`\<`T`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2314

Find the maximum value of field

#### Type Parameters

##### T

`T` *extends* `unknown`

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### field

keyof `Attributes`\<`M`\>

##### options?

`AggregateOptions`\<`T`, `Attributes`\<`M`\>\>

#### Returns

`Promise`\<`T`\>

#### Inherited from

`Model.max`

***

### min()

> `static` **min**\<`T`, `M`\>(`this`, `field`, `options?`): `Promise`\<`T`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2323

Find the minimum value of field

#### Type Parameters

##### T

`T` *extends* `unknown`

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### field

keyof `Attributes`\<`M`\>

##### options?

`AggregateOptions`\<`T`, `Attributes`\<`M`\>\>

#### Returns

`Promise`\<`T`\>

#### Inherited from

`Model.min`

***

### removeAttribute()

> `static` **removeAttribute**(`attribute`): `void`

Defined in: node\_modules/sequelize/types/model.d.ts:2008

Remove attribute from model definition

#### Parameters

##### attribute

`string`

#### Returns

`void`

#### Inherited from

`Model.removeAttribute`

***

### removeHook()

> `static` **removeHook**\<`H`\>(`this`, `hookType`, `name`): `HooksCtor`\<`H`\>

Defined in: node\_modules/sequelize/types/hooks.d.ts:144

Remove hook from the model

#### Type Parameters

##### H

`H` *extends* `Hooks`\<`Model`\<`any`, `any`\>, `any`, `any`\>

#### Parameters

##### this

`HooksStatic`\<`H`\>

##### hookType

keyof `SequelizeHooks`\<`H`\[`"_model"`\], `Attributes`\<`H`\>, `CreationAttributes`\<`H`\>\>

##### name

`string`

#### Returns

`HooksCtor`\<`H`\>

#### Inherited from

`Model.removeHook`

***

### restore()

> `static` **restore**\<`M`\>(`this`, `options?`): `Promise`\<`void`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2468

Restore multiple instances if `paranoid` is enabled.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### options?

`RestoreOptions`\<`Attributes`\<`M`\>\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`Model.restore`

***

### schema()

> `static` **schema**\<`M`\>(`this`, `schema`, `options?`): `ModelCtor`\<`M`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2032

Apply a schema to this model. For postgres, this will actually place the schema in front of the table
name
- `"schema"."tableName"`, while the schema will be prepended to the table name for mysql and
sqlite - `'schema.tablename'`.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### schema

`string`

The name of the schema

##### options?

`SchemaOptions`

#### Returns

`ModelCtor`\<`M`\>

#### Inherited from

`Model.schema`

***

### scope()

> `static` **scope**\<`M`\>(`this`, `options?`): `ModelCtor`\<`M`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2102

Apply a scope created in `define` to the model. First let's look at how to create scopes:
```js
class MyModel extends Model {}
MyModel.init(attributes, {
  defaultScope: {
    where: {
      username: 'dan'
    },
    limit: 12
  },
  scopes: {
    isALie: {
      where: {
        stuff: 'cake'
      }
    },
    complexFunction(email, accessLevel) {
      return {
        where: {
          email: {
            [Op.like]: email
          },
          accesss_level {
            [Op.gte]: accessLevel
          }
        }
      }
    }
  },
  sequelize,
})
```
Now, since you defined a default scope, every time you do Model.find, the default scope is appended to
your query. Here's a couple of examples:
```js
Model.findAll() // WHERE username = 'dan'
Model.findAll({ where: { age: { gt: 12 } } }) // WHERE age > 12 AND username = 'dan'
```

To invoke scope functions you can do:
```js
Model.scope({ method: ['complexFunction' 'dan@sequelize.com', 42]}).findAll()
// WHERE email like 'dan@sequelize.com%' AND access_level >= 42
```

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### options?

`string` \| `ScopeOptions` \| readonly (`string` \| `ScopeOptions`)[] \| `WhereAttributeHash`\<`M`\>

#### Returns

`ModelCtor`\<`M`\>

Model A reference to the model, with the scope(s) applied. Calling scope again on the returned
 model will clear the previous scope.

#### Inherited from

`Model.scope`

***

### sum()

> `static` **sum**\<`T`, `M`\>(`this`, `field`, `options?`): `Promise`\<`number`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2332

Find the sum of field

#### Type Parameters

##### T

`T` *extends* `unknown`

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### field

keyof `Attributes`\<`M`\>

##### options?

`AggregateOptions`\<`T`, `Attributes`\<`M`\>\>

#### Returns

`Promise`\<`number`\>

#### Inherited from

`Model.sum`

***

### sync()

> `static` **sync**\<`M`\>(`options?`): `Promise`\<`M`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2014

Sync this Model to the DB, that is create the table. Upon success, the callback will be called with the
model instance (this)

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### options?

`SyncOptions`

#### Returns

`Promise`\<`M`\>

#### Inherited from

`Model.sync`

***

### truncate()

> `static` **truncate**\<`M`\>(`this`, `options?`): `Promise`\<`void`\>

Defined in: node\_modules/sequelize/types/model.d.ts:2450

Truncate all instances of the model. This is a convenient method for Model.destroy({ truncate: true }).

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### options?

`TruncateOptions`\<`Attributes`\<`M`\>\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`Model.truncate`

***

### unscoped()

> `static` **unscoped**\<`M`\>(`this`): `M`

Defined in: node\_modules/sequelize/types/model.d.ts:2571

Unscope the model

#### Type Parameters

##### M

`M` *extends* `ModelType`\<`any`, `any`\>

#### Parameters

##### this

`M`

#### Returns

`M`

#### Inherited from

`Model.unscoped`

***

### update()

#### Call Signature

> `static` **update**\<`M`\>(`this`, `values`, `options`): `Promise`\<\[`number`, `M`[]\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2478

Update multiple instances that match the where options. The promise returns an array with one or two
elements. The first element is always the number of affected rows, while the second element is the actual
affected rows (only supported in postgres and mssql with `options.returning` true.)

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### values

\{ \[key in string \| number \| symbol\]?: Col \| Fn \| Literal \| Attributes\<M\>\[key\] \}

###### options

`Omit`\<`UpdateOptions`\<`Attributes`\<`M`\>\>, `"returning"`\> & `object`

##### Returns

`Promise`\<\[`number`, `M`[]\]\>

##### Inherited from

`Model.update`

#### Call Signature

> `static` **update**\<`M`\>(`this`, `values`, `options`): `Promise`\<\[`number`\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2492

Update multiple instances that match the where options. The promise returns an array with one or two
elements. The first element is always the number of affected rows, while the second element is the actual
affected rows (only supported in postgres and mssql with `options.returning` true.)

##### Type Parameters

###### M

`M` *extends* `Model`\<`any`, `any`\>

##### Parameters

###### this

`ModelStatic`\<`M`\>

###### values

\{ \[key in string \| number \| symbol\]?: Col \| Fn \| Literal \| Attributes\<M\>\[key\] \}

###### options

`UpdateOptions`\<`Attributes`\<`M`\>\>

##### Returns

`Promise`\<\[`number`\]\>

##### Inherited from

`Model.update`

***

### upsert()

> `static` **upsert**\<`M`\>(`this`, `values`, `options?`): `Promise`\<\[`M`, `boolean` \| `null`\]\>

Defined in: node\_modules/sequelize/types/model.d.ts:2424

Insert or update a single row. An update will be executed if a row which matches the supplied values on
either the primary key or a unique key is found. Note that the unique index must be defined in your
sequelize model and not just in the table. Otherwise you may experience a unique constraint violation,
because sequelize fails to identify the row that should be updated.

**Implementation details:**

* MySQL - Implemented as a single query `INSERT values ON DUPLICATE KEY UPDATE values`
* PostgreSQL - Implemented as a temporary function with exception handling: INSERT EXCEPTION WHEN
  unique_constraint UPDATE
* SQLite - Implemented as two queries `INSERT; UPDATE`. This means that the update is executed
regardless
  of whether the row already existed or not

**Note** that SQLite returns null for created, no matter if the row was created or updated. This is
because SQLite always runs INSERT OR IGNORE + UPDATE, in a single query, so there is no way to know
whether the row was inserted or not.

#### Type Parameters

##### M

`M` *extends* `Model`\<`any`, `any`\>

#### Parameters

##### this

`ModelStatic`\<`M`\>

##### values

`MakeNullishOptional`\<`M`\[`"_creationAttributes"`\]\>

##### options?

`UpsertOptions`\<`Attributes`\<`M`\>\>

#### Returns

`Promise`\<\[`M`, `boolean` \| `null`\]\>

#### Inherited from

`Model.upsert`
