import { REST, Routes } from 'discord.js';
import * as config from '../config.json' assert { type: 'json' };
import { glob } from 'glob';

const commands = [];
// Grab all the command files from the commands directory you created earlier

const commandFiles = await glob(`./Commands/**/*.js`);

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for await (const file of commandFiles) {
  const command = (await import(`../${file}`)).default;
  commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(config.default.token);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(config.default.clientId, config.default.guildId), {
      body: commands,
    });

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
