const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKENS = require("./config/auth.json");
const config = require("./config/config.json");

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});
