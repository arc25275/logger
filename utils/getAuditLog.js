const config = require("../config/config.json");

module.exports = async function getLog(logType, message) {
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: logType,
	});
	const currentTime = new Date();
	const log = fetchedLogs.entries.first();
	if (config.getAuditLog == "true") {
		if (!log.target.id == message.id) {
			return message.author.id;
		}
	}
	const executor = log;
	console.log(executor.executor.id);
	return executor.executor.id;
};
