const fs = require("fs");
const sendError = require("../utils/sendError.js");
const sendSuccess = require("../utils/sendSuccess.js");

module.exports = {
	name: "disable",
	description: "Disables logging on the server.",
	async execute(message, args) {
		guildID = message.guild.id;
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;
			const jsonData = JSON.parse(data.toString());

			if (jsonData[guildID].logChannel == "placeholder") {
				sendError(message, "Logging already disabled");
				return;
			} else {
				jsonData[guildID].logChannel = "placeholder";
				fs.writeFile(
					"./config/data.json",
					JSON.stringify(jsonData, null, "\t"),
					(err) => {
						if (err) throw err;
						console.log("The file has been saved! (Logging Disabled)");
					}
				);
				sendError(message, "Logging disabled");
			}
		});
	},
};
