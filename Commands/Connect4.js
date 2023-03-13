const { SlashCommandBuilder} = require('discord.js');
const { Connect4 } = require('discord-gamecord');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect4')
        .setDescription('Spiele VierGewinnt')
        .addUserOption((option) =>
            option
                .setName('member')
                .setDescription('Gegner')
    ),
    async execute(interaction) {

        const Game = new Connect4({
            message: interaction,
            isSlashGame: true,
            opponent: interaction.options.getUser('member'),
            embed: {
                title: 'VierGewinnt Spiel',
                statusTitle: 'Status',
                color: '#5865F2'
            },
            emojis: {
                board: '⚪',
                player1: '🔴',
                player2: '🟡'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            turnMessage: '{emoji} | **{player}** ist dran',
            winMessage: '{emoji} | **{player}** hat VierGewinnt gewonnen.',
            tieMessage: 'Das Spiel steht unentschieden! Keiner hat das Spiel gewonnen!',
            timeoutMessage: 'Das Spiel wurde nicht zu Ende gespielt! Keiner hat das Spiel gewonnen!',
            playerOnlyMessage: 'Nur {player} und {opponent} können diese Schaltflächen verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            //console.log(result);
        });
    }
}