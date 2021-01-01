module.exports = async function getLog(logType, object) {
	const fetchedLogs = await object.guild.fetchAuditLogs({
		limit: 1,
		type: logType,
	});
	const log = fetchedLogs.entries.first();
	const executor = log;
	return executor.executor.id;
};
