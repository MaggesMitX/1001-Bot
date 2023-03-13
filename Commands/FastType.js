const { SlashCommandBuilder} = require('discord.js');
const { FastType } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fasttype')
        .setDescription('Spiele FastType'),
    async execute(interaction) {

        const Game = new FastType({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Fast Type',
                color: '#5865F2',
                description: 'Du hast {time} Sekunden, um den folgenden Text zu tippen'
            },
            timeoutTime: 60000,
            sentence: 'Max ist der coolste Mensch auf der Welt.',
            winMessage: 'Du hast gewonnen! Du hast FastType in {time} Sekunden mit einer Geschwindigkeit von {wpm} beendet.',
            loseMessage: 'Du hast verloren! Du hast den richtigen Satz nicht rechtzeitig getippt.',
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            //console.log(result);  // =>  { result... }
        });
    }
}