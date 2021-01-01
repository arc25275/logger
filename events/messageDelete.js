const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");

module.exports = {
	once: false,
	async run(client, message) {
		if (message.author.id === client.user.id) return;
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
				url: config.deleteSprite,
			},
			fields: [
				{
					name: "Message deleted in",
					value: `<#${message.channel.id}> (${message.channel.id})`,
					inline: true,
				},
				{
					name: "Message sent by",
					value: `<@${message.author.id}> (${message.author.id})`,
					inline: true,
				},
			],
		};
		sendEmbed(message, client, embed);
	},
};
