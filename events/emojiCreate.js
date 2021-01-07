const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
const serverData = require("../config/data.json");
const messageDelete = require("./messageDelete.js");

module.exports = {
	once: false,
	async run(client, emoji) {
		if (serverData[emoji.guild.id].events["emojiCreate"] == true) {
			const executor = await getLog("EMOJI_CREATE", emoji);
			const extension = emoji.animated ? "gif" : "png";
			const embed = {
				title: "Emoji Created",
				description: `Name: \n \`${emoji.name}\` \n Emote: ${emoji}`,
				color: config.createColor,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config.createSprite,
				},
				fields: [
					{
						name: "Emoji created by",
						value: `<@${executor}> \n (${executor})`,
						inline: true,
					},
				],
			};

			sendEmbed(emoji, client, embed);
		}
	},
};
