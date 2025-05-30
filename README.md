<div align="center">

<img width="128" src="logger.png" alt="Pixel art of a log"/>

# Logger

</div>

Logger is a WIP discord bot to log all actions and events that can happen in a discord server!

This is my first bot, and I know this isn't an original idea, but I still want practice.

## Setup

First, you will need a Bot created in the [Discord Developer Portal](https://discord.com/developers/docs/quick-start/getting-started). Make sure it has the `Message Content Intent`, which is under the `Bot` tab. It also needs the `bot` scope under the `Install` tab.

Clone the repository, and run `npm install` to install the dependencies. Create `auth.json`, `config.json` and `data.json` in `./config` by using the templates provided in that directory.

Run the bot using `npm run dev`, and once it is running, you can add your bot to the server and default data should be created and placed into `data.json`.

## Planned Features

- Adding all events
- Refactor / Upgrade to slash commands.

## Current Features

### Commands

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

Usage: `$modrole ['add' | 'remove'] <roleid>`

Adds and removes roles that can use commands

### Events:

#### Most useful events found in [Discord API Documentation](https://discord.com/developers/docs/events/gateway-events#receive-events)

Most events pull from the audit logs to check who did an action, with the exception of deleted messages.

## Credits

[@vicrobex](https://github.com/vicrobex) - Sprite graphics

[@cattte](https://github.com/cattte) - Help with code when I'm stupid
