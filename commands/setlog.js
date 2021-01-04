const fs = require("fs");
const sendError = require("../utils/sendError.js");
const sendSuccess = require("../utils/sendSuccess.js");

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
			sendError(message, "Invalid Channel");
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
		sendSuccess(message, `Log channel set to ${args[0]}`);
	},
};
