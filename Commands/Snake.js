const { SlashCommandBuilder} = require('discord.js');
const { Snake } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snake')
        .setDescription('Spiele Snake'),
    async execute(interaction) {

        const Game = new Snake({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Snake Game',
                overTitle: 'Game Over',
                color: '#5865F2'
            },
            emojis: {
                board: '⬛',
                food: '🍎',
                up: '⬆️',
                down: '⬇️',
                left: '⬅️',
                right: '➡️',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Stop',
            timeoutTime: 60000,
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            //console.log(result);  // =>  { result... }
        });
    }
}