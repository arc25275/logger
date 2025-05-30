module.exports = async function getLog(logType, object) {
	const fetchedLogs = await object.guild.fetchAuditLogs({
		limit: 1,
		type: logType,
	});
	const log = fetchedLogs.entries.first();
	return log.executor.id;
};
