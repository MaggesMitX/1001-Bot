import { SlashCommandBuilder } from 'discord.js';
import { TwoZeroFourEight } from 'discord-gamecord';
import { handleGameEnd } from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('2048').setDescription('Spiele 2048').setDMPermission(false),
  async execute(interaction) {
    const Game = new TwoZeroFourEight({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: '2048',
        color: '#5865F2',
      },
      emojis: {
        up: '⬆️',
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
      handleGameEnd(interaction, result, "2048", 30, 5);
    });
  },
};
