const fs = require("fs");

module.exports = {
    once: false,
    async run(client, guild) {
        guildID = guild.id;
        fs.readFile("./config/data.json", (err, data) => {
            if (err) throw err;

            const jsonData = JSON.parse(data.toString());
            
            delete jsonData[guildID];
            fs.writeFile("./config/data.json", JSON.stringify(jsonData, null, "\t"), (err) => {
                if (err) throw err;
                console.log(`The file has been updated! (Guild deleted: ${guild.name})`);
            });
        });
    },
};
