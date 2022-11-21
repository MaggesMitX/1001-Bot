const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { handleCommands } = require('./Utils/command_handler');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (bot) => {
  console.log(`Ready! Logged in as ${bot.user.tag}`);
});

client.login(token);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

async function main() {
  await handleCommands(client);
}

main();
