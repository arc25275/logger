const fs = require("fs");
const Discord = require("discord.js");
const TOKEN = require("./config/auth.json");
let serverData = {};
const config = require("./config/config.json");
const prefix = config.prefix;

try {
	serverData = require("./config/data.json");
} catch (error) {
	console.error("Error loading data.json:", error);
	console.log("Creating a new data.json file with default structure.");
	serverData = {};
	fs.writeFileSync("./config/data.json", JSON.stringify(serverData, null, "\t"));
	console.log("data.json created successfully.");
	serverData = require("./config/data.json");
}

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MEMBERS,
	],
});
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
	if (
		message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some((r) =>
			JSON.stringify(serverData[message.guild.id].modRoles).includes(r.name)
		)
	) {
		try {
			client.commands.get(command).execute(message, args);
		} catch (error) {
			console.log(error);
		}
	}
});

//Event Handler
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	eventList = [];
	files.forEach((file) => {
		if (file.startsWith("_")) return;
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
			console.log(error);
		}

		eventList.push(event);
	});
	if (Object.keys(config.events).length === eventList.length){
		console.log("Event List is probably up to date.");
		return;
	}
	fs.writeFile(
		"./config/config.json",
		JSON.stringify(
			{
				...config,
				events: eventList,
			},
			null,
			"\t"
		),
		(err) => {
			if (err) throw err;
			console.log("The file has been saved! (Event List Updated)");
		}
	);
});
