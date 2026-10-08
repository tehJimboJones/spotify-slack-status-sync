[**spotify-status-bot**](../../../README.md)

***

[spotify-status-bot](../../../README.md) / [db/connection](../README.md) / getDbConnection

# Function: getDbConnection()

> **getDbConnection**(`configService`): `Sequelize`

Defined in: [src/db/connection.ts:26](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/db/connection.ts#L26)

Initializes and returns the Sequelize database connection.

## Parameters

### configService

[`IConfigService`](../../../services/config/types/interfaces/IConfigService.md)

The application configuration containing DB credentials.

## Returns

`Sequelize`

The authenticated Sequelize instance.
