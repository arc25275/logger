const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
const serverData = require("../config/data.json");
module.exports = {
	once: false,
	async run(client, oldChannel, newChannel) {
		if (serverData[newChannel.guild.id].events["channelUpdate"] == true) {
			const executor = await getLog("CHANNEL_UPDATE", oldChannel);

			const embed = {
				title: "Channel edited",
				description: `**Old channel settings:** \n\n Name: \`${oldChannel.name}\`\n Topic: \`${oldChannel.topic}\`\n NSFW: \`${oldChannel.nsfw}\`\n Slowmode: \`${oldChannel.rateLimitPerUser}\`\n \n\n **New channel settings:** \n\n Name: \`${newChannel.name}\`\n Topic: \`${newChannel.topic}\`\n NSFW: \`${newChannel.nsfw}\`\n Slowmode: \`${newChannel.rateLimitPerUser}\``,
				color: config.editColor,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config.editSprite,
				},
				fields: [
					{
						name: "Channel edited",
						value: `<#${oldChannel.id}> \n (${oldChannel.id})`,
						inline: true,
					},
					{
						name: "Channel edited by",
						value: `<@${executor}> \n (${executor})`,
						inline: true,
					},
				],
			};
			sendEmbed(oldChannel, client, embed);
		}
	},
};
