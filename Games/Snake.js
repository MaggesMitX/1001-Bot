const { Snake } = require('discord-gamecord');

const Game = new Snake({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Snake Game',
        overTitle: 'Game Over',
        color: '#5865F2'
    },
    emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️',
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
    },
    snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
    foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
    stopButton: 'Stop',
    timeoutTime: 60000,
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});