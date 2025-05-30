const sendEmbed = require("../utils/sendEmbed.js");
const config = require("../config/config.json");
const getLog = require("../utils/getAuditLog.js");
const serverData = require("../config/data.json");

module.exports = {
	once: false,
	async run(client, channel, timestamp) {
        console.log("Channel Pins Update");
		if (serverData[channel.guild.id].events["channelPinsUpdate"] == true) {
			const executor = await getLog("CHANNEL_PINS_UPDATE", channel);
            const pinned = await channel.messages.fetchPinned();
            const pinCount = pinned.size;
            const lastPinnedMessage = pinned.first();

            // If the timestamp of the most recent message is older than 10 seconds, the event must have been an unpinning
            const unpinned = (timestamp < Date.now() - 10000);
            
            let embed = {}
            if (unpinned) {
                embed = {
                    title: "Message unpinned",
                    description: `Channel: \n <#${channel.id}> \`${channel.name}\`
                    \nPin count:\n ${pinCount}`,
                    color: config.deleteColor,
                    timestamp: `${new Date().toLocaleString()}`,
                    thumbnail: {
                        url: config.deleteSprite,
                    },
                    fields: [
                        {
                            name: "Messaged unpinned by",
                            value: `<@${executor}> \n (${executor})`,
                            inline: true,
                        }
                    ],
                };
            } else {
                embed = {
                    title: "Message pinned",
                    description: `Channel: \n <#${channel.id}> \`${channel.name}\`
                    \nPin count: \n${pinCount}\n\n Message: \n ${lastPinnedMessage.url} \`${lastPinnedMessage.content}\``,
                    color: config.createColor,
                    timestamp: `${new Date().toLocaleString()}`,
                    thumbnail: {
                        url: config.createSprite,
                    },
                    fields: [
                        {
                            name: "Messaged pinned by",
                            value: `<@${executor}> \n (${executor})`,
                            inline: true,
                        },
                        {
                            name: "Message sent by",
                            value: `<@${lastPinnedMessage.author.id}> \n (${lastPinnedMessage.author.id})`,
                            inline: true,
                        }
                    ],
                };
            }
			sendEmbed(channel, client, embed);
		}
	},
};
