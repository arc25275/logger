const fs = require("fs");
const Discord = require("discord.js");
const TOKEN = require("./config/auth.json");
const serverData = require("./config/data.json");
const config = require("./config/config.json");
const prefix = config.prefix;

const client = new Discord.Client();
client.events = new Discord.Collection();
client.commands = new Discord.Collection();

client.login(TOKEN.token);

//Command Handler
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.log(error);
	}
});
//Event Handler
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);

	files.forEach((file) => {
		const eventFunction = require(`./events/${file}`);
		if (eventFunction.disabled) return;

		const event = file.split(".")[0];
		const emitter = client;
		const once = eventFunction.once;

		try {
			emitter[once ? "once" : "on"](
				event,
				eventFunction.run.bind(null, client)
			);
		} catch (error) {
			console.error(error.stack);
		}
	});
});
