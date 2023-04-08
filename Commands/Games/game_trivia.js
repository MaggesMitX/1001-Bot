import { SlashCommandBuilder } from 'discord.js';
import { Trivia } from 'discord-gamecord';
import { handleGameEnd } from "../../Utils/money.js";

const choices = [
  {name: "Easy", value: "easy"},
  {name: "Medium", value: "medium"},
  {name: "Hard", value: "hard"}
];


export default {
  data: new SlashCommandBuilder().setName('trivia').setDescription('Spiele Trivia').setDMPermission(false)
      .addStringOption((option) => option
          .setName('difficulty')
          .setNameLocalizations({de: 'schwierigkeit'})
          .setDescription('Choose the difficulty of the question')
          .setDescriptionLocalizations({de: 'Wähle die Schwierigkeit der Frage'})
          .setChoices(...choices)),
  async execute(interaction) {

    let difficultyInput = interaction.options.get('difficulty')?.value;
    if(!difficultyInput) difficultyInput = "medium";

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
      difficulty: difficultyInput, // easy || medium || hard
      winMessage: 'Gewonnen! Die richtige Antwort ist {answer}.',
      loseMessage: 'Leider verloren! Die richtige Antwort wäre {answer}.',
      errMessage: 'Es können keine Fragedaten abgerufen werden! Bitte versuche es erneut.',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }

      const difficulty = result.question.difficulty;
      const coins = {
        hard: [10, 15],
        medium: [5, 5],
        default: [3, 3],
      }[difficulty] || [3, 3];

      handleGameEnd(interaction, result, "Trivia", ...coins);
    });
  },
};
