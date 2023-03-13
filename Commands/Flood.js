const { SlashCommandBuilder} = require('discord.js');
const { FastType, Flood} = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flood')
        .setDescription('Spiele Flood'),
    async execute(interaction) {

        const Game = new Flood({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Fülle das Spielfeld mit einer Farbe!',
                color: '#5865F2',
            },
            difficulty: 13,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
            winMessage: 'Du hast gewonnen! Züge: **{turns}**',
            loseMessage: 'Du hast verloren! Züge: **{turns}**',
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            //console.log(result);  // =>  { result... }
        });
    }
}