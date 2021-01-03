const fs = require("fs");

module.exports = {
	name: "setlog",
	description: "Sets what channel events get logged to.",
	async execute(message, args) {
		guildID = message.guild.id;
		cleanArg = args[0].replace(/\D/g, "");
		if (
			message.guild.channels.cache.get(cleanArg) === undefined ||
			cleanArg.match(/^<#\d{18}>$/) == false
		) {
			const embed = {
				description: `Invalid Channel`,
				color: 13632027,
			};
			message.channel.send({ embed });
			return;
		}
		newData = {
			logChannel: cleanArg,
		};
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			jsonData[guildID].logChannel = cleanArg;
			fs.writeFile(
				"./config/data.json",
				JSON.stringify(jsonData, null, "\t"),
				(err) => {
					if (err) throw err;
					console.log("The file has been saved! (Log channel set)");
				}
			);
		});
		const embed = {
			description: `Log channel set to ${args[0]}`,
			color: 1497188,
		};
		message.channel.send({ embed });
	},
};
