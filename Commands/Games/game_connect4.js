import { SlashCommandBuilder } from 'discord.js';
import { Connect4 } from 'discord-gamecord';
import { handleGameEnd } from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder()
    .setName('connect4')
    .setDescription('Spiele VierGewinnt')
    .setDMPermission(false)
    .addUserOption((option) => option.setName('member').setDescription('Gegner').setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser('member');

    if (!target) {
      return interaction.reply('Es wurde kein Mitspieler angegeben!');
    }

    const Game = new Connect4({
      message: interaction,
      isSlashGame: true,
      opponent: target,
      embed: {
        title: 'VierGewinnt Spiel',
        statusTitle: 'Status',
        color: '#5865F2',
      },
      emojis: {
        board: '⚪',
        player1: '🔴',
        player2: '🟡',
      },
      mentionUser: true,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      turnMessage: '{emoji} | **{player}** ist dran',
      winMessage: '{emoji} | **{player}** hat VierGewinnt gewonnen.',
      tieMessage: 'Das Spiel steht unentschieden! Keiner hat das Spiel gewonnen!',
      requestMessage: '{player} hat dich zu **Connect4** eingeladen.',
      rejectMessage: 'Der Spieler hat deine Einladung zu **Connect4** abgelehnt.',
      timeoutMessage: 'Das Spiel wurde nicht zu Ende gespielt! Keiner hat das Spiel gewonnen!',
      playerOnlyMessage: 'Nur {player} und {opponent} können diese Schaltflächen verwenden.',
      reqTimeoutMessage: 'Der Spieler hat die Einladung nicht rechtzeitig angenommen.',
      buttons: {
        accept: 'Annehmen',
        reject: 'Ablehnen',
      },
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);
      handleGameEnd(interaction, result, "Connect4", 10, 5);
    });
  },
};
