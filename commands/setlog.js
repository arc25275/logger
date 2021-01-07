const fs = require("fs");
const sendError = require("../utils/sendError.js");
const sendSuccess = require("../utils/sendSuccess.js");

module.exports = {
	name: "setlog",
	description: "Sets what channel events get logged to.",
	async execute(message, args) {
		guildID = message.guild.id;
		var channel;
		if (!args[0]) {
			sendError(
				message,
				"Invalid channel provided (Must be a mention, ID, or name)"
			);
			return;
		}
		if (args[0].match(/^\d{18}/)) {
			channel = message.guild.channels.cache.get(args[0]);
		} else if (args[0].match(/^<#\d{18}>$/)) {
			channel = message.guild.channels.cache.get(
				args[0].replace("<#", "").replace(">", "")
			);
		} else {
			channel = message.guild.channels.cache.find(
				(channel) => channel.name === args[0]
			);
		}
		if (!channel) {
			sendError(
				message,
				"Invalid channel provided (Must be a mention, ID, or name)"
			);
			return;
		}
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			jsonData[guildID].logChannel = channel.id;
			fs.writeFile(
				"./config/data.json",
				JSON.stringify(jsonData, null, "\t"),
				(err) => {
					if (err) throw err;
					console.log("The file has been saved! (Log channel set)");
				}
			);
		});
		sendSuccess(message, `Log channel set to <#${channel.id}>`);
	},
};
