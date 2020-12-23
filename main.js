const fs = require("fs");
const Discord = require("discord.js");
const TOKEN = require("./config/auth.json");
const config = require("./config/config.json");

const client = new Discord.Client();
client.events = new Discord.Collection();

client.login(TOKEN.token);

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);

  files.forEach((file) => {
    const eventFunction = require(`./events/${file}`);
    if (eventFunction.disabled) return;

    const event = eventFunction.event || file.split(".")[0];
    const emitter =
      (typeof eventFunction.emitter === "string"
        ? client[eventFunction.emitter]
        : eventFunction.emitter) || client;
    const once = eventFunction.once;

    try {
      emitter[once ? "once" : "on"](event, (client) =>
        eventFunction.run(client)
      );
    } catch (error) {
      console.error(error.stack);
    }
  });
});

client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
});
