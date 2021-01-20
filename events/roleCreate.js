const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
const serverData = require("../config/data.json");

module.exports = {
	once: false,
	async run(client, role) {
		if (serverData[role.guild.id].events["roleCreate"] == true) {
			const executor = await getLog("ROLE_CREATE", role);
			const embed = {
				title: "Role created",
				description: `Name: <@&${role.id}> \`${role.name}\` \n ID: ${role.id}`,
				color: config.createColor,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config.createSprite,
				},
				fields: [
					{
						name: "Role created by",
						value: `<@${executor}> \n (${executor})`,
						inline: true,
					},
				],
			};
			sendEmbed(role, client, embed);
		}
	},
};
