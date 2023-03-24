import * as data from './config.json' assert { type: 'json' };
import { Client, GatewayIntentBits } from 'discord.js';
import handleCommands from './Utils/command_handler.js';
import handleEvents from './Utils/event_handler.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(data.default.token);

async function main() {
  client.prisma = prisma;
  await handleCommands(client);
  await handleEvents(client);
  console.log('Bot is up an ready!');
}

await main();
prisma.$disconnect();
