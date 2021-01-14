const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
const serverData = require("../config/data.json");

module.exports = {
	once: false,
	async run(client, channel) {
		if (serverData[channel.guild.id].events["channelCreate"] == true) {
			const executor = await getLog("CHANNEL_CREATE", channel);
			const embed = {
				title: "Channel created",
				description: `Name: \n <#${channel.id}> \`${channel.name}\`
				ID: \n ${channel.id}`,
				color: config.createColor,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config.createSprite,
				},
				fields: [
					{
						name: "Channel created by",
						value: `<@${executor}> \n (${executor})`,
						inline: true,
					},
				],
			};
			sendEmbed(channel, client, embed);
		}
	},
};
