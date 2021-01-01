const fs = require("fs");

module.exports = {
	name: "setlog",
	description: "Sets log channel",
	async execute(message, args) {
		guildID = message.guild.id;
		cleanArg = args[0].replace(/\D/g, "");
		newData = {
			logChannel: cleanArg,
		};
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			jsonData[guildID] = newData;
			fs.writeFile("./config/data.json", JSON.stringify(jsonData), (err) => {
				if (err) throw err;
				console.log("The file has been saved!");
			});
		});
		const embed = {
			description: `Log channel set to ${args[0]}`,
			color: 1497188,
		};
		message.channel.send({ embed });
	},
};
