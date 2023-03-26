import { SlashCommandBuilder } from 'discord.js';
import { WouldYouRather } from 'discord-gamecord';

export default {
  data: new SlashCommandBuilder().setName('wouldyourather').setDescription('Spiele WouldYouRather').setDMPermission(false),
  async execute(interaction) {
    const Game = new WouldYouRather({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Würdest du eher..',
        color: '#5865F2',
      },
      buttons: {
        option1: 'Option 1',
        option2: 'Option 2',
      },
      timeoutTime: 60000,
      errMessage: 'Es können keine Fragedaten abgerufen werden! Bitte versuche es erneut.',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
  },
};
