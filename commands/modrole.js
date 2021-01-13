const fs = require("fs");
const sendError = require("../utils/sendError.js");
const sendSuccess = require("../utils/sendSuccess.js");

module.exports = {
	name: "modrole",
	description: "Adds or removes modroles from the server",
	async execute(message, args) {
		const guildID = message.guild.id;

		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			var role;
			if (!args[0]) {
				sendError(message, "Invalid option (must be either `add` or `remove`)");
				return;
			}
			if (!args[1]) {
				sendError(
					message,
					"Invalid role provided (Must be either a mention, ID, or name)"
				);
				return;
			}
			if (args[1].match(/^\d{18}/)) {
				role = message.guild.roles.cache.get(args[1]);
			} else if (args[1].match(/^<@&\d{18}>$/)) {
				role = message.guild.roles.cache.get(
					args[1].replace("<@&", "").replace(">", "")
				);
			} else {
				role = message.guild.roles.cache.find((role) => role.name === args[1]);
			}
			if (!role) {
				sendError(
					message,
					"Invalid role provided (Must be either a mention, ID, or name)"
				);
				return;
			}
			if (args[0] == "add") {
				if (jsonData[guildID].modRoles[role.name]) {
					sendError(message, `\`${role.name}\` is already a modrole`);
					return;
				}
				jsonData[guildID].modRoles[role.name] = role.id;
				fs.writeFile(
					"./config/data.json",
					JSON.stringify(jsonData, null, "\t"),
					(err) => {
						if (err) throw err;
						console.log("The file has been saved! (ModRole added)");
					}
				);
				sendSuccess(message, `modrole added: \`${role.name}\``);
			} else if (args[0] == "remove" || "delete") {
				if (!jsonData[guildID].modRoles[role.name]) {
					sendError(message, `\`${role.name}\` is not a modrole`);
					return;
				}
				delete jsonData[guildID].modRoles[role.name];
				fs.writeFile(
					"./config/data.json",
					JSON.stringify(jsonData, null, "\t"),
					(err) => {
						if (err) throw err;
						console.log("The file has been saved! (ModRole Removed)");
					}
				);
				sendError(message, `modrole removed: \`${role.name}\``);
			}
		});
	},
};
