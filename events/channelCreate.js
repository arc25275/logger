const config = require("../config/config.json");

module.exports = {
  once: false,
  run(client, channel) {
    const embed = {
      title: "Channel Created",
      description: `${
        channel.type.charAt(0).toUpperCase() + channel.type.slice(1)
      } channel <#${channel.id}> created. \n Name: \`#${channel.name}\` (${
        channel.id
      })`,
      color: 1497188,
      timestamp: `${new Date().toLocaleString()}`,
      thumbnail: {
        url:
          "https://media.discordapp.net/attachments/737388909197262948/791155943454015508/notepad.png",
      },
    };
    client.channels.cache.get(config.logChannel).send({ embed });
  },
};
