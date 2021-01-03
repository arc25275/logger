# Logger

Logger is a WIP discord bot to log all actions and events that can happen in a discord server!

This is my first bot, and I know this isn't an original idea, but I still want practice.

## Planned Features:

- Adding all events
- Hopefully making code less shitty

## Current Features:

### Commands:

#### $setlog

Usage: `$setlog <#channel>`

Sets what channel events get logged to.

#### $disable

Usage: `$disable`

Disables logging on the server.

#### $config

Usage: `$config <event> ['true' | 'false']`

Enable or disable events.

#### $events

Usage: `$events`
Lists all events and their current status.

### Events:

#### Most useful events found here: https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584

Most events pull from the audit logs to check who did an action, with the exception of deleted messages.
