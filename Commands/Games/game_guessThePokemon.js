import { SlashCommandBuilder } from 'discord.js';
import { GuessThePokemon } from 'discord-gamecord';
import { handleGameEnd } from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('guessthepokemon').setDescription('Spiele GuessThePokemon').setDMPermission(false),
  async execute(interaction) {
    const Game = new GuessThePokemon({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: "Who's that Pokémon (Englisch!)",
        color: '#5865F2',
      },
      timeoutTime: 60000,
      winMessage: 'Richtig! Es war ein {pokemon}.',
      loseMessage: 'Leider falsch, richtig wäre {pokemon}.',
      errMessage: 'Pokémon-Sammlung nicht verfügbar, bitte versuchen es erneut.',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
      handleGameEnd(interaction, result, "GuessThePokemon", 10, 5);
    });
  },
};
