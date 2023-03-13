const { SlashCommandBuilder} = require('discord.js');
const { TicTacToe } = require('discord-gamecord');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('Spiele TicTacToe')
        .addUserOption((option) =>
            option
                .setName('member')
                .setDescription('Gegner')
        ),
    async execute(interaction) {

        const target = interaction.options.getUser('member');

        if (!target) {
            return interaction.editReply(
                'Es wurde kein Mitspieler angegeben!'
            );
        }

        const Game = new TicTacToe({
            message: interaction,
            isSlashGame: true,
            opponent: target,
            embed: {
                title: 'Tic Tac Toe',
                color: '#5865F2',
                statusTitle: 'Status',
                overTitle: 'Game Over'
            },
            emojis: {
                xButton: '❌',
                oButton: '🔵',
                blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} |  **{player}** ist am Zug.',
            winMessage: '{emoji} | **{player}** hat das Spiel gewonnen!',
            tieMessage: 'Unentschieden! Keiner hat gewonnen!',
            timeoutMessage: 'Das Spiel wurde nicht zu Ende gespielt! Keiner hat das Spiel gewonnen!',
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            //console.log(result);

        });
    }
}