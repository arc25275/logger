module.exports = async function getLog(logType, message) {
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: logType,
	});
	const log = fetchedLogs.entries.first();
	if (!log.target.id == message.id) {
		return message.author.id;
	}
	const executor = log;
	return executor.executor.id;
};
