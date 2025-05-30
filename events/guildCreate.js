const fs = require("fs");
const events = require("../config/config.json").events;

module.exports = {
	once: false,
	async run(client, guild) {
		guildID = guild.id;
		console.log(`New guild joined: ${guild.name} (id: ${guild.id})`);
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			eventMap = events.reduce((acc, event) => {
				acc[event] = true;
				return acc;
			}, {});
			if (jsonData[guildID]) return;
			jsonData[guildID] = {
				logChannel: "placeholder",
				events: eventMap,
				modRoles: {},
			};
			fs.writeFile(
				"./config/data.json",
				JSON.stringify(jsonData, null, "\t"),
				(err) => {
					if (err) throw err;
					console.log("The file has been saved! (First time config created)");
				}
			);
		});
	},
};
