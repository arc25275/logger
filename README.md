<div align="center">

<img width="128" src="https://media.discordapp.net/attachments/737388909197262948/796812054253797376/logger.png" />

# Logger

</div>

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

#### $modrole

Usage: `modrole ['add' | 'remove'] <roleid>`

Adds and removes roles that can use commands

### Events:

#### Most useful events found here: https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584

Most events pull from the audit logs to check who did an action, with the exception of deleted messages.

## Credits

[@vicrobex](https://github.com/vicrobex) - Sprite graphics

[@cattte](https://github.com/cattte) - Help with code when I'm stupid
