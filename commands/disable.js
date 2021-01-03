const fs = require("fs");

module.exports = {
	name: "disable",
	description: "Disables logging on the server.",
	async execute(message, args) {
		guildID = message.guild.id;
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			jsonData[guildID].logChannel = "placeholder";
			fs.writeFile(
				"./config/data.json",
				JSON.stringify(jsonData, null, "\t"),
				(err) => {
					if (err) throw err;
					console.log("The file has been saved! (Logging Disabled)");
				}
			);
		});
		const embed = {
			description: `Disabled Logging`,
			color: 13632027,
		};
		message.channel.send({ embed });
	},
};
