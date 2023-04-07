import { SlashCommandBuilder } from 'discord.js';
import { Minesweeper } from 'discord-gamecord';
import { handleGameEnd } from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('minesweeper').setDescription('Spiele Minesweeper').setDMPermission(false),
  async execute(interaction) {
    const Game = new Minesweeper({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Minesweeper',
        color: '#5865F2',
        description: 'Klicke auf die Schaltflächen, um die Blöcke (mit Ausnahme der Minen!) aufzudecken.',
      },
      emojis: { flag: '🚩', mine: '💣' },
      mines: 5,
      timeoutTime: 60000,
      winMessage: 'Du hast das Spiel gewonnen! Du hast alle Minen erfolgreich umgangen.',
      loseMessage: 'Du hast das Spiel verloren! Hüte dich das nächste Mal vor den Minen.',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
      handleGameEnd(interaction, result, "MineSweeper", 10, 5);
    });
  },
};
