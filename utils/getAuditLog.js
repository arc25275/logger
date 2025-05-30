module.exports = async function getLog(logType, object) {
	let fetchedLogs = null;
	try {
		fetchedLogs = await object.guild.fetchAuditLogs({
			limit: 1,
			type: logType,
		});
	} catch (error) {
		console.error(`Error fetching audit logs: ${error}`);
		return null;
	}
	const log = fetchedLogs.entries.first();
	return log.executor.id;
};
