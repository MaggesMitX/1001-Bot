import { Collection } from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

export default async function handleCommands(client) {
  client.commands = new Collection();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const commandsPath = path.join(__dirname, '../Commands');
  const commandFiles = await glob(`${commandsPath}/**/*.js`);

  for (const file of commandFiles) {
    const command = (await import(file)).default;

    if (!('data' in command && 'execute' in command)) {
      return console.log(`[WARNING] the command at ${file} is missing a mandatory "data" or "execute" property! ⚠️`);
    }

    client.commands.set(command.data.name, command);
  }
}
