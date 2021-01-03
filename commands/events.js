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
			)}\n\`\`\` \n [List of all events and descriptions](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584)`,
		};
		message.channel.send({ embed });
	},
};
