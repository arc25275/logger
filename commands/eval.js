module.exports = {
	name: "eval",
	description: "Runs code",
	usage: "<code>",
	async execute(message, args) {
		if (message.author.id !== "369661965376946176") return;
		try {
			const code = args.join(" ");
			let evaled = eval(code);

			if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

			message.channel.send(evaled, { code: "xl" });
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
		}
	},
};
