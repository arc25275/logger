const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
const serverData = require("../config/data.json");
module.exports = {
	once: false,
	async run(client, channel) {
		if (serverData[channel.guild.id].events["channelDelete"] == true) {
			const executor = await getLog("CHANNEL_DELETE", channel);
			const embed = {
				title: "Channel deleted",
				description: `Name: \n \`${channel.name}\`
				ID: \n ${channel.id}`,
				color: config.deleteColor,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config.deleteSprite,
				},
				fields: [
					{
						name: "Channel deleted by",
						value: `<@${executor}> \n (${executor})`,
						inline: true,
					},
				],
			};
			sendEmbed(channel, client, embed);
		}
	},
};
