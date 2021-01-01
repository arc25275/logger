const fs = require("fs");

module.exports = {
	once: false,
	async run(client, guild) {
		guildID = guild.id;
		newData = {
			logChannel: "placeholder",
		};
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			if (jsonData[guildID]) return;
			jsonData[guildID] = newData;
			fs.writeFile("./config/data.json", JSON.stringify(jsonData), (err) => {
				if (err) throw err;
				console.log("The file has been saved! (First time config created)");
			});
		});
	},
};
