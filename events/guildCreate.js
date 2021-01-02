const fs = require("fs");

module.exports = {
	once: false,
	async run(client, guild) {
		guildID = guild.id;
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			if (jsonData[guildID]) return;
			jsonData[guildID] = {
				logChannel: "placeholder",
				events: {
					channelCreate: true,
					channelDelete: true,
					hannelPinsUpdate: true,
					channelUpdate: true,
					clientUserGuildSettingsUpdate: true,
					clientUserSettingsUpdate: true,
					debug: true,
					emojiCreate: true,
					emojiDelete: true,
					emojiUpdate: true,
					error: true,
					guildBanAdd: true,
					guildBanRemove: true,
					guildMemberAdd: true,
					guildMemberRemove: true,
					guildMemberSpeaking: true,
					guildMemberUpdate: true,
					guildUpdate: true,
					messageDeleteBulk: true,
					messageReactionAdd: true,
					messageReactionRemove: true,
					messageReactionRemoveAll: true,
					messageUpdate: true,
					presenceUpdate: true,
					roleCreate: true,
					roleDelete: true,
					roleUpdate: true,
					userUpdate: true,
					voiceStateUpdate: true,
				},
			};
			fs.writeFile(
				"./config/data.json",
				JSON.stringify(jsonData, null, "\t"),
				(err) => {
					if (err) throw err;
					console.log("The file has been saved! (First time config created)");
				}
			);
		});
	},
};
