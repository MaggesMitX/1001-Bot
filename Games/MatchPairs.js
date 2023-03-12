const { MatchPairs } = require('discord-gamecord');

const Game = new MatchPairs({
    message: message,
    isSlashGame: false,
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

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});