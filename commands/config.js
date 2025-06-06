const fs = require("fs");
const config = require("../config/config.json");
const sendError = require("../utils/sendError.js");
const sendSuccess = require("../utils/sendSuccess.js");
const eventList = config.events

module.exports = {
	name: "config",
	description: "Enable or disable events",
	async execute(message, args) {
		guildID = message.guild.id;
		if (eventList.includes(args[0]) == false) {
			sendError(
				message,
				`Invalid event (All events: \`${config.prefix}events\`)`
			);
			return;
		}
		if (!new RegExp(/^true|^false/i).test(args[1])) {
			sendError(message, `Invalid option (Must be \`true\` or \`false\`)`);
			return;
		}
		const option = JSON.parse(args[1].toLowerCase());
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			jsonData[guildID].events[args[0]] = option;
			fs.writeFile(
				"./config/data.json",
				JSON.stringify(jsonData, null, "\t"),
				(err) => {
					if (err) throw err;
					console.log("The file has been saved! (Config changed)");
				}
			);
		});
		if (option === true) {
			sendSuccess(message, `Logging enabled for \`${args[0]}\``);
		}
		if (option === false) {
			sendError(message, `Logging disabled for \`${args[0]}\``);
		}
	},
};
