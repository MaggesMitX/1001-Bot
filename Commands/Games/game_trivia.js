import { SlashCommandBuilder } from 'discord.js';
import { Trivia } from 'discord-gamecord';

export default {
  data: new SlashCommandBuilder().setName('trivia').setDescription('Spiele Trivia'),
  async execute(interaction) {
    const Game = new Trivia({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Trivia',
        color: '#5865F2',
        description: 'Du hast 60 Sekunden Zeit, um die Antwort zu erraten!',
      },
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      trueButtonStyle: 'SUCCESS',
      falseButtonStyle: 'DANGER',
      mode: 'multiple', // multiple || single
      difficulty: 'medium', // easy || medium || hard
      winMessage: 'Gewonnen! Die richtige Antwort ist {answer}.',
      loseMessage: 'Leider verloren! Die richtige Antwort wäre {answer}.',
      errMessage: 'Es können keine Fragedaten abgerufen werden! Bitte versuche es erneut.',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
    });
  },
};
