const serverData = require("../config/data.json");

module.exports = function sendEmbed(object, client, embed) {
	if (serverData[object.guild.id]) {
		if (serverData[object.guild.id].logChannel !== "placeholder") {
			client.channels.cache
				.get(serverData[object.guild.id].logChannel)
				.send({ embed });
		}
	}
};
