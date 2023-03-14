const { SlashCommandBuilder} = require('discord.js');
const { Minesweeper } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('minesweeper')
        .setDescription('Spiele Minesweeper'),
    async execute(interaction){

        const Game = new Minesweeper({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Minesweeper',
                color: '#5865F2',
                description: 'Klicke auf die Schaltflächen, um die Blöcke (mit Ausnahme der Minen!) aufzudecken.'
            },
            emojis: { flag: '🚩', mine: '💣' },
            mines: 5,
            timeoutTime: 60000,
            winMessage: 'Du hast das Spiel gewonnen! Du hast alle Minen erfolgreich umgangen.',
            loseMessage: 'Du hast das Spiel verloren! Hüte dich das nächste Mal vor den Minen.',
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            //console.log(result);  // =>  { result... }
        });
    }
}