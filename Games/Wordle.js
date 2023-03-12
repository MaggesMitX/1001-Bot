const { Wordle } = require('discord-gamecord');

const Game = new Wordle({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Wordle',
        color: '#5865F2',
    },
    customWord: null,
    timeoutTime: 60000,
    winMessage: 'Du hast gewonnen! Das Wort war **{word}**.',
    loseMessage: 'Leider verloren! das Wort war **{word}**.',
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});