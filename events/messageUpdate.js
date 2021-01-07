const config = require("../config/config.json");
const sendEmbed = require("../utils/sendEmbed.js");
const serverData = require("../config/data.json");

module.exports = {
	once: false,
	run(client, oldMessage, newMessage) {
		if (serverData[oldMessage.guild.id].events["messageUpdate"] == true) {
			if (oldMessage.content == newMessage.content) return;
			if (oldMessage.content.length > 944) {
				oldMessage.content = oldMessage.content.slice(0, 944);
				oldMessage.content = oldMessage.content.concat("...");
			}
			if (newMessage.content.length > 944) {
				newMessage.content = newMessage.content.slice(0, 944);
				newMessage.content = newMessage.content.concat("...");
			}
			const embed = {
				title: "Message Edited",
				description: `**Old Message:** \n\n ${oldMessage.content} \n\n **New Message:** \n\n ${newMessage.content}`,
				color: 15514391,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config.editSprite,
				},
				fields: [
					{
						name: "Message edited in",
						value: `<#${oldMessage.channel.id}> \n (${oldMessage.channel.id})`,
						inline: true,
					},
					{
						name: "Message sent by",
						value: `<@${oldMessage.author.id}> \n (${oldMessage.author.id})`,
						inline: true,
					},
				],
			};
			sendEmbed(oldMessage, client, embed);
		}
	},
};
