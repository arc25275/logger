const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
module.exports = {
	once: false,
	async run(client, channel) {
		const executor = await getLog("CHANNEL_DELETE", channel);
		const embed = {
			title: "Channel Deleted",
			description: `${
				channel.type.charAt(0).toUpperCase() + channel.type.slice(1)
			} channel deleted by <@${executor}> (${executor}) \n Name: \`#${
				channel.name
			}\` (${channel.id})`,
			color: 13632027,
			timestamp: `${new Date().toLocaleString()}`,
			thumbnail: {
				url:
					"https://media.discordapp.net/attachments/737388909197262948/791077743869296690/trashcan2.png",
			},
		};
		client.channels.cache.get(config.logChannel).send({ embed });
	},
};
