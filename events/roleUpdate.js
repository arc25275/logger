const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
const serverData = require("../config/data.json");
const fs = require("fs");

module.exports = {
	once: false,
	async run(client, oldRole, newRole) {
		console.log(oldRole);
		if (
			oldRole.rawPosition !== newRole.rawPosition &&
			oldRole.name == newRole.name &&
			oldRole.color == newRole.color &&
			oldRole.mentionable == newRole.mentionable &&
			oldRole.permissions == newRole.permissions &&
			oldRole.hoist == newRole.hoist
		)
			//I know this code is really shitty but I'm lazy maybe I'll fix it if I rewrite this eventually
			return;
		if (serverData[oldRole.guild.id].events["roleUpdate"] == true) {
			const executor = await getLog("ROLE_UPDATE", oldRole);
			const embed = {
				title: "Role edited",
				description: `**Old role settings:** \n\n Name: \`${oldRole.name}\`\n Color: \`${oldRole.color}\`\n Position: \`${oldRole.rawPosition}\`\n Mentionable: \`${oldRole.mentionable}\`\n \n\n **New role settings:** \n\n Name: \`${newRole.name}\`\n Color: \`${newRole.color}\`\n Position: \`${newRole.rawPosition}\`\n Mentionable: \`${newRole.mentionable}\``,
				color: config.editColor,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config.editSprite,
				},
				fields: [
					{
						name: "Role edited",
						value: `<@&${oldRole.id}> \n (${oldRole.id})`,
						inline: true,
					},
					{
						name: "Role edited by",
						value: `<@${executor}> \n (${executor})`,
						inline: true,
					},
				],
			};

			sendEmbed(oldRole, client, embed);
		}
		if (serverData[oldRole.guild.id].modRoles[oldRole.name]) {
			fs.readFile("./config/data.json", (err, data) => {
				if (err) throw err;
				const jsonData = JSON.parse(data.toString());
				delete jsonData[oldRole.guild.id].modRoles[oldRole.name];
				jsonData[oldRole.guild.id].modRoles[newRole.name] = newRole.id;
				fs.writeFile(
					"./config/data.json",
					JSON.stringify(jsonData, null, "\t"),
					(err) => {
						if (err) throw err;
						console.log("The file has been saved! (Role Updated)");
					}
				);
			});
		}
	},
};
