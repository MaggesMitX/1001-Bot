import { SlashCommandBuilder } from 'discord.js';
import { TicTacToe } from 'discord-gamecord';
import { handleGameEnd } from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder()
    .setName('tictactoe')
    .setDescription('Spiele TicTacToe')
    .setDMPermission(false)
    .addUserOption((option) => option.setName('member').setDescription('Gegner').setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser('member');

    if (!target) {
      return interaction.reply('Es wurde kein Mitspieler angegeben!');
    }

    const Game = new TicTacToe({
      message: interaction,
      isSlashGame: true,
      opponent: target,
      embed: {
        title: 'Tic Tac Toe',
        color: '#5865F2',
        statusTitle: 'Status',
        overTitle: 'Game Over',
      },
      emojis: {
        xButton: '❌',
        oButton: '🔵',
        blankButton: '➖',
      },
      mentionUser: true,
      timeoutTime: 60000,
      xButtonStyle: 'DANGER',
      oButtonStyle: 'PRIMARY',
      turnMessage: '{emoji} |  **{player}** ist am Zug.',
      winMessage: '{emoji} | **{player}** hat das Spiel gewonnen!',
      tieMessage: 'Unentschieden! Keiner hat gewonnen!',
      timeoutMessage: 'Das Spiel wurde nicht zu Ende gespielt! Keiner hat das Spiel gewonnen!',
      requestMessage: '{player} hat dich zu **Tic Tac Toe** eingeladen.',
      rejectMessage: 'Der Spieler hat deine Einladung zu **Tic Tac Toe** abgelehnt.',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
      reqTimeoutMessage: 'Der Spieler hat die Einladung nicht rechtzeitig angenommen.',
      buttons: {
        accept: 'Annehmen',
        reject: 'Ablehnen',
      },
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);
      handleGameEnd(interaction, result, "TicTacToe", 20, 10);
    });
  },
};
