const fs = require("fs");

module.exports = {
	name: "disable",
	description: "Disables Logging",
	async execute(message, args) {
		guildID = message.guild.id;
		newData = {
			logChannel: "placeholder",
		};
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			jsonData[guildID] = newData;
			fs.writeFile("./config/data.json", JSON.stringify(jsonData), (err) => {
				if (err) throw err;
				console.log("The file has been saved! (Logging Disabled)");
			});
		});
		const embed = {
			description: `Disabled Logging`,
			color: 13632027,
		};
		message.channel.send({ embed });
	},
};
