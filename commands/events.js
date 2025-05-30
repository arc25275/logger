const serverData = require("../config/data.json");

module.exports = {
	name: "events",
	description: "Displays all events",
	async execute(message, args) {
		const embed = {
			description: `\`\`\`py\n${JSON.stringify(
				serverData[message.guild.id].events,
				null,
				2
			)}\n\`\`\` \n [List of all events and descriptions](https://discord.com/developers/docs/events/gateway-events#receive-events)`,
		};
		message.channel.send({ embed });
	},
};
