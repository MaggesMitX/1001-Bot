const { SlashCommandBuilder} = require('discord.js');
const { Hangman } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hangman')
        .setDescription('Spiele Hangman'),
    async execute(interaction) {

        function getRandom() {
            let max = 4999;
            let min = 1;
            return Math.random() * (max - min) + min;
        }

        const Game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Hangman',
                color: '#5865F2'
            },
            hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
            customWord: interaction.client.customWords[getRandom()],
            timeoutTime: 60000,
            theme: 'nature',
            winMessage: 'Du hast gewonnen! Das Wort war **{word}**.',
            loseMessage: 'Du hast verloren! Das Wort war **{word}**.',
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            interaction.editReply('Verloren')
            console.log(result);  // =>  { result... }
        });
    }
}
