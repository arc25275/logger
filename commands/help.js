const config = require("../config/config.json");

module.exports = {
	name: "help",
	description: "Displays info if you need help",
	async execute(message, args) {
		if (args[0] == null) {
			const embed = {
				title: `Commands:`,
				color: null,
				fields: [
					{
						name: `${config.prefix}setlog`,
						value: `Usage: \`${config.prefix}setlog <#channel>\`\nSets what channel events get logged to.`,
					},
					{
						name: `${config.prefix}disable`,
						value: `Usage: \`${config.prefix}disable\`\nDisables logging on the server.`,
					},
					{
						name: `${config.prefix}config`,
						value: `Usage: \`${config.prefix}config <event> ['true' | 'false']\`\nEnable or disable events.`,
					},
					{
						name: `${config.prefix}events`,
						value: `Usage: \`${config.prefix}events\`\nLists all events and their current status.`,
					},
				],
			};
			message.channel.send({ embed });
		}
	},
};
