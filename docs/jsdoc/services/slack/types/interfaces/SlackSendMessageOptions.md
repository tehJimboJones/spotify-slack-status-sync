[**spotify-status-bot**](../../../../README.md)

***

[spotify-status-bot](../../../../README.md) / [services/slack/types](../README.md) / SlackSendMessageOptions

# Interface: SlackSendMessageOptions

Defined in: [src/services/slack/types.ts:25](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/types.ts#L25)

Options for sending messages to Slack.

## Properties

### iconEmoji?

> `optional` **iconEmoji?**: `string`

Defined in: [src/services/slack/types.ts:29](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/types.ts#L29)

Custom emoji icon (e.g. :robot_face:)

***

### threadTs?

> `optional` **threadTs?**: `string`

Defined in: [src/services/slack/types.ts:31](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/types.ts#L31)

Parent message timestamp to reply in thread

***

### username?

> `optional` **username?**: `string`

Defined in: [src/services/slack/types.ts:27](https://github.com/tehJimboJones/spotify-slack-status-sync/blob/1402fbb61b76cfa6bdbfdcbea9a2cb5b97347808/src/services/slack/types.ts#L27)

Custom bot username to post as (requires chat:write.customize)
