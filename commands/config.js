const fs = require("fs");

module.exports = {
	name: "config",
	description: "Enable or disable events",
	async execute(message, args) {
		guildID = message.guild.id;
		const eventArray = [
			"channelDelete",
			"ChannelPinsUpdate",
			"channelUpdate",
			"clientUserGuildSettingsUpdate",
			"clientUserSettingsUpdate",
			"debug",
			"emojiCreate",
			"emojiDelete",
			"emojiUpdate",
			"error",
			"guildBanAdd",
			"guildBanRemove",
			"guildMemberAdd",
			"guildMemberRemove",
			"guildMemberSpeaking",
			"guildMemberUpdate",
			"guildUpdate",
			"messageDelete",
			"messageDeleteBulk",
			"messageReactionAdd",
			"messageReactionRemove",
			"messageReactionRemoveAll",
			"messageUpdate",
			"presenceUpdate",
			"roleCreate",
			"roleDelete",
			"roleUpdate",
			"userUpdate",
			"voiceStateUpdate",
		];
		if (eventArray.includes(args[0]) == false) {
			const embed = {
				description: `Invalid Event`,
				color: 13632027,
			};
			message.channel.send({ embed });
			return;
		}
		console.log(new RegExp(/^true|^false/i).test(args[1]));
		if (!new RegExp(/^true|^false/i).test(args[1])) {
			const embed = {
				description: `Invalid Option`,
				color: 13632027,
			};
			message.channel.send({ embed });
			return;
		}
		const option = JSON.parse(args[1].toLowerCase());
		console.log(option);
		fs.readFile("./config/data.json", (err, data) => {
			if (err) throw err;

			const jsonData = JSON.parse(data.toString());
			jsonData[guildID].events[args[0]] = option;
			fs.writeFile(
				"./config/data.json",
				JSON.stringify(jsonData, null, "\t"),
				(err) => {
					if (err) throw err;
					console.log("The file has been saved! (Logging Disabled)");
				}
			);
		});
		if (option === true) {
			const embed = {
				description: `Logging enabled for ${args[0]}`,
				color: 1497188,
			};
			message.channel.send({ embed });
		}
		if (option === false) {
			const embed = {
				description: `Logging disabled for ${args[0]}`,
				color: 13632027,
			};
			message.channel.send({ embed });
		}
	},
};
