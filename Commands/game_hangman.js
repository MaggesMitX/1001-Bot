const { SlashCommandBuilder} = require('discord.js');
const { Hangman } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hangman')
        .setDescription('Spiele Hangman'),
    async execute(interaction) {

        let wordToGuess = getRandomWord(interaction.client.customWords);

        const Game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Hangman',
                color: '#5865F2'
            },
            hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
            customWord: wordToGuess,
            timeoutTime: 60000,
            theme: 'nature',
            winMessage: 'Du hast gewonnen! Das Wort war **{word}**.',
            loseMessage: 'Du hast verloren! Das Wort war **{word}**.',
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            interaction.editReply('Verloren')
            //console.log(result);  // =>  { result... }
        });
    }
}

function getRandomWord(list) {
    return list[Math.floor((Math.random()*list.length))];
}