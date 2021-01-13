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
	async run(client, oldRole, newRole) {
		console.log("a");
		if (serverData[oldRole.guild.id].modRoles[oldRole.name]) {
			console.log("b");
			fs.readFile("./config/data.json", (err, data) => {
				if (err) throw err;
				const jsonData = JSON.parse(data.toString());
				console.log(jsonData);
				console.log(jsonData[oldRole.guild.id].modRoles[oldRole.name]);
				delete jsonData[oldRole.guild.id].modRoles[oldRole.name];
				jsonData[oldRole.guild.id].modRoles[newRole.name] = newRole.id;
				fs.writeFile(
					"./config/data.json",
					JSON.stringify(jsonData, null, "\t"),
					(err) => {
						if (err) throw err;
						console.log("The file has been saved! (Role Updated)");
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
