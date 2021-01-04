module.exports = function sendError(message, args) {
	const embed = {
		description: args,
		color: 13632027,
	};
	message.channel.send({ embed });
};
