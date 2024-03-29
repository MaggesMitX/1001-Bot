import { SlashCommandBuilder } from 'discord.js';
import { FastType } from 'discord-gamecord';
import { handleGameEnd } from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('fasttype').setDescription('Spiele FastType').setDMPermission(false),
  async execute(interaction) {

    let textToWrite = getRandomWord(interaction.client.fastTypeText);

    const Game = new FastType({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Fast Type',
        color: '#5865F2',
        description: 'Du hast {time} Sekunden, um den folgenden Text zu tippen',
      },
      timeoutTime: 60000,
      sentence: textToWrite,
      winMessage: 'Du hast gewonnen! Du hast FastType in {time} Sekunden mit einer Geschwindigkeit von {wpm} beendet.',
      loseMessage: 'Du hast verloren! Du hast den richtigen Satz nicht rechtzeitig getippt.',
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
      handleGameEnd(interaction, result, "FastType", 5, 5);
    });
  },
};

function getRandomWord(list) {
  return list[Math.floor(Math.random() * list.length)];
}
