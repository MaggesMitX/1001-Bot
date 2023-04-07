import { SlashCommandBuilder } from 'discord.js';
import { Flood } from 'discord-gamecord';
import { handleGameEnd } from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('flood').setDescription('Spiele Flood').setDMPermission(false),
  async execute(interaction) {


    const Game = new Flood({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Fülle das Spielfeld mit einer Farbe!',
        color: '#5865F2',
      },
      difficulty: 13,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
      winMessage: 'Du hast gewonnen! Züge: **{turns}**',
      loseMessage: 'Du hast verloren! Züge: **{turns}**',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
      handleGameEnd(interaction, result, "Flood", 10, 5);
    });
  },
};
