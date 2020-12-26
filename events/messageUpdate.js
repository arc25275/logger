const config = require("../config/config.json");

module.exports = {
	once: false,
	run(client, oldMessage, newMessage) {
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
			footer: {
				text: `${oldMessage.author.tag}`,
				icon_url: `${oldMessage.author.avatarURL()}`,
			},
			thumbnail: {
				url:
					"https://media.discordapp.net/attachments/737388909197262948/791068495873441792/pencil.png",
			},
			fields: [
				{
					name: "Message edited in",
					value: `<#${oldMessage.channel.id}> (${oldMessage.channel.id})`,
					inline: true,
				},
				{
					name: "Message sent by",
					value: `<@${oldMessage.author.id}> (${oldMessage.author.id})`,
					inline: true,
				},
			],
		};
		client.channels.cache.get(config.logChannel).send({ embed });
	},
};
