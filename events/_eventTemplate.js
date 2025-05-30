const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
const serverData = require("../config/data.json");

module.exports = {
	once: false,
	async run(client, channel) {
		if (serverData[channel.guild.id].events[EVENT NAME] == true) {
			const executor = await getLog("DISCORD EVENT NAME", OBJECT);
			const embed = {
				title: "",
				description: ``,
				color: config. COLOR,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config. SPRITE,
				},
				fields: [
					
				],
			};
			sendEmbed(channel, client, embed);
		}
	},
};
