const { Collection } = require('discord.js');
const path = require('path');
const glob = require('glob');

async function handleCommands(client) {
  client.commands = new Collection();

  const commandsPath = path.join(__dirname, '../Commands');
  const commandFiles = await glob(`${commandsPath}/**/*.js`);

  for (const file of commandFiles) {
    const command = require(file);

    if (!('data' in command && 'execute' in command)) {
      return console.log(
        `[WARNING] the command at ${filePath} is missing a mandatory "data" or "execute" property! ⚠️`
      );
    }

    client.commands.set(command.data.name, command);
  }
}

module.exports = { handleCommands };
