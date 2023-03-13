const { SlashCommandBuilder} = require('discord.js');
const { TwoZeroFourEight } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('2048')
        .setDescription('Spiele 2048'),
    async execute(interaction) {
        const Game = new TwoZeroFourEight({
            message: interaction,
            isSlashGame: false,
            embed: {
                title: '2048',
                color: '#5865F2'
            },
            emojis: {
                up: '⬆️',
                down: '⬇️',
                left: '⬅️',
                right: '➡️',
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            interaction.editReply('Verloren')
            console.log(result);  // =>  { result... }
        });
    }
}