[**spotify-status-bot**](../../../README.md)

***

[spotify-status-bot](../../../README.md) / [db/connection](../README.md) / getDbConnection

# Function: getDbConnection()

> **getDbConnection**(`configService`): `Sequelize`

Defined in: [src/db/connection.ts:25](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1e46a35f98db5d61d3f91586400e86d860cce2c4/src/db/connection.ts#L25)

Initializes and returns the Sequelize database connection.

## Parameters

### configService

[`IConfigService`](../../../services/config/types/interfaces/IConfigService.md)

The application configuration containing DB credentials.

## Returns

`Sequelize`

The authenticated Sequelize instance.
