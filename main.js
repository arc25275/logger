const fs = require("fs");
const Discord = require("discord.js");
const TOKEN = require("./config/auth.json");
const config = require("./config/config.json");

const client = new Discord.Client();
client.events = new Discord.Collection();

client.login(TOKEN.token);

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
