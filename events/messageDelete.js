const config = require("../config/config.json");

module.exports = {
  once: false,
  run(client, message) {
    if (message.author.id === client.user.id) return;
    console.log(
      `Message deleted in #${message.channel.name} has been logged. ${message.cleanContent.length} Chars long. `
    );

    const embed = {
      title: "Message Deleted",
      description: `${message.cleanContent}`,
      color: 13632027,
      timestamp: `${new Date().toLocaleString()}`,
      footer: {
        text: `${message.author.tag}`,
        icon_url: `${message.author.avatarURL()}`,
      },
      thumbnail: {
        url:
          "https://media.discordapp.net/attachments/737388909197262948/791077743869296690/trashcan2.png",
      },
      fields: [
        {
          name: "Message deleted in",
          value: `<#${message.channel.id}> (${message.channel.id})`,
          inline: true,
        },
        {
          name: "Message sent by",
          value: `<@${message.author.id}> (${message.author.id})`,
          inline: true,
        },
      ],
    };
    client.channels.cache.get(config.logChannel).send({ embed });
  },
};
