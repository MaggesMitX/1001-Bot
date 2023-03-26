import { SlashCommandBuilder } from 'discord.js';
import { Slots } from 'discord-gamecord';

export default {
  data: new SlashCommandBuilder().setName('slots').setDescription('Spiele Slots'),
  async execute(interaction) {
    const Game = new Slots({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Slot Machine',
        color: '#5865F2',
      },
      slots: ['🍇', '🍊', '🍋', '🍌'],
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
    });
  },
};
