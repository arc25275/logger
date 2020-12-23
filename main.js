const Discord = require("discord.js");
const client = new Discord.Client();
const TOKEN = require("./config/auth.json");
const config = require("./config/config.json");
client.login(TOKEN.token);

client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on("messageDelete", async (message) => {
  if (message.author.id === client.user.id) return;
  console.log(
    `Message deleted in #${message.channel.name} has been logged. ${message.cleanContent.length} Chars long. `
  );

  const embed = {
    title: "Message Deletion",
    description: `\`\`\`${message.cleanContent}\`\`\``,
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
        value: `<#${message.channel.id}>`,
        inline: true,
      },
      {
        name: "Message sent by",
        value: `<@${message.author.id}>`,
        inline: true,
      },
    ],
  };
  console.log(embed.description.length);
  await client.channels.cache.get(config.logChannel).send({ embed });
});
