module.exports = function sendSuccess(message, args) {
	const embed = {
		description: args,
		color: 1497188,
	};
	message.channel.send({ embed });
};
