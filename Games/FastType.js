const { FastType } = require('discord-gamecord');

const Game = new FastType({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Fast Type',
        color: '#5865F2',
        description: 'Du hast {time} Sekunden, um den folgenden Text zu tippen'
    },
    timeoutTime: 60000,
    sentence: 'Some really cool sentence to fast type.',
    winMessage: 'Du hast gewonnen! Du hast das Schreibmaschinenrennen in {time} Sekunden mit einer Geschwindigkeit von {wpm} beendet.',
    loseMessage: 'Du hast verloren! Du hast den richtigen Satz nicht rechtzeitig getippt.',
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});