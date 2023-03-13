const { SlashCommandBuilder} = require('discord.js');
const { MatchPairs } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('matchpairs')
        .setDescription('Spiele MatchPairs'),
    async execute(interaction) {

        const Game = new MatchPairs({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Paare finden',
                color: '#5865F2',
                description: '**Klicke auf die Schaltflächen, um die Emojis den entsprechenden Paaren zuzuordnen.'
            },
            timeoutTime: 60000,
            emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
            winMessage: 'Du hast das Spiel gewonnen! Du hast insgesamt `{tilesTurned}` Plättchen gedreht.**',
            loseMessage: '** Du hast das Spiel verloren! Du hast insgesamt `{tilesTurned}` Plättchen gedreht.**',
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            //console.log(result);  // =>  { result... }
        });
    }
}
