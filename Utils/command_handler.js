const { Collection } = require('discord.js');
const path = require('path');
const fs = require('fs');

async function handleCommands(client) {
  client.commands = new Collection();

  const commandsPath = path.join(__dirname, '../Commands');
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (!('data' in command && 'execute' in command)) {
      return console.log(
        `[WARNING] the command at ${filePath} is missing a mandatory "data" or "execute" property! ⚠️`
      );
    }

    client.commands.set(command.data.name, command);
  }
}

module.exports = { handleCommands };
