const sendEmbed = require("../utils/sendEmbed.js");
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
				url: config.deleteSprite,
			},
		};
		sendEmbed(channel, client, embed);
	},
};
