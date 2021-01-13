/*****************************************
NOT DONE! NEEDS ACTUAL LOGGING IMPLEMENTED
*****************************************/

const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
const serverData = require("../config/data.json");
const fs = require("fs");

module.exports = {
	once: false,
	async run(client, role) {
		if (serverData[role.guild.id].modRoles[role.name]) {
			fs.readFile("./config/data.json", (err, data) => {
				if (err) throw err;
				const jsonData = JSON.parse(data.toString());
				delete jsonData[role.guild.id].modRoles[role.name];

				fs.writeFile(
					"./config/data.json",
					JSON.stringify(jsonData, null, "\t"),
					(err) => {
						if (err) throw err;
						console.log("The file has been saved! (Role Deleted)");
					}
				);
			});
		}
		/*if (serverData[OBJECT.guild.id].events["EVENT NAME"] == true) {
			const executor = await getLog("TYPE OF EVENT", OBJECT);
			const embed = {
				title: "EMBED TITLE",
				description: `EMBED DESCRIPTION`,
				color: COLOR,
				timestamp: `${new Date().toLocaleString()}`,
				thumbnail: {
					url: config.SPRITETYPE,
				},
			};
			sendEmbed(OBJECT, client, embed);
		}*/
	},
};
