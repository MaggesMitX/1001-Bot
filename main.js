const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { handleCommands } = require('./Utils/command_handler');
const { handleEvents } = require('./Utils/event_handler');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.login(token);

async function main() {
  await handleCommands(client);
  await handleEvents(client);
}

main();
