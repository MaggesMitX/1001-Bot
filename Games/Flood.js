const { Flood } = require('discord-gamecord');

const Game = new Flood({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Flood',
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

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});