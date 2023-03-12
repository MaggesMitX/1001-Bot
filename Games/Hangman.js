const { Hangman } = require('discord-gamecord');

const Game = new Hangman({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Hangman',
        color: '#5865F2'
    },
    hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
    customWord: 'Gamecord',
    timeoutTime: 60000,
    theme: 'nature',
    winMessage: 'Du hast gewonnen! Das Wort war **{word}**.',
    loseMessage: 'Du hast verloren! Das Wort war **{word}**.',
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});