import { SlashCommandBuilder } from 'discord.js';
import { Wordle } from 'discord-gamecord';
import {handleGameEnd} from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('wordle').setDescription('Spiele Wordle').setDMPermission(false),
  async execute(interaction) {
    const Game = new Wordle({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Wordle',
        color: '#5865F2',
      },
      customWord: null,
      timeoutTime: 60000,
      winMessage: 'Du hast gewonnen! Das Wort war **{word}**.',
      loseMessage: 'Leider verloren! das Wort war **{word}**.',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
      handleGameEnd(interaction, result, "Wordle", 10, 5);
    });
  },
};
