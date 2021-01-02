const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const serverData = require("../config/data.json");

module.exports = {
	once: false,
	async run(client, message) {
		if (serverData[message.guild.id].events["messageDelete"] === true) {
			if (message.author.id === client.user.id) return;
			const embed = {
				title: "Message Deleted",
				description: `${message.cleanContent}`,
				color: 13632027,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config.deleteSprite,
				},
				fields: [
					{
						name: "Message deleted in",
						value: `<#${message.channel.id}> \n (${message.channel.id})`,
						inline: true,
					},
					{
						name: "Message sent by",
						value: `<@${message.author.id}> \n (${message.author.id})`,
						inline: true,
					},
				],
			};
			sendEmbed(message, client, embed);
		}
	},
};
