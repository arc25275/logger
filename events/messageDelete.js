const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");

module.exports = {
	once: false,
	async run(client, message) {
		if (message.author.id === client.user.id) return;
		const executor = await getLog("MESSAGE_DELETE", message);
		const embed = {
			title: "Message Deleted",
			description: `${message.cleanContent}`,
			color: 13632027,
			timestamp: `${new Date().toLocaleString()}`,
			footer: {
				text: `${message.author.tag} (${message.author.id})`,
				icon_url: `${message.author.avatarURL()}`,
			},
			thumbnail: {
				url:
					"https://media.discordapp.net/attachments/737388909197262948/791077743869296690/trashcan2.png",
			},
			fields: [
				{
					name: "Message deleted in",
					value: `<#${message.channel.id}> (${message.channel.id})`,
					inline: true,
				},
				{
					name: "Message deleted by",
					value: `<@${executor}> (${executor})`,
					inline: true,
				},
			],
		};
		client.channels.cache.get(config.logChannel).send({ embed });
	},
};
