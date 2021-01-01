const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
module.exports = {
	once: false,
	async run(client, channel) {
		const executor = await getLog("CHANNEL_CREATE", channel);
		const embed = {
			title: "Channel Created",
			description: `${
				channel.type.charAt(0).toUpperCase() + channel.type.slice(1)
			} channel <#${
				channel.id
			}> created by <@${executor}> (${executor}) \n Name: \`#${
				channel.name
			}\` (${channel.id})`,
			color: 1497188,
			timestamp: `${new Date().toLocaleString()}`,
			thumbnail: {
				url: config.createSprite,
			},
		};
		sendEmbed(channel, client, embed);
	},
};
