const { TicTacToe } = require('discord-gamecord');

const Game = new TicTacToe({
    message: message,
    isSlashGame: false,
    opponent: message.mentions.users.first(),
    embed: {
        title: 'Tic Tac Toe',
        color: '#5865F2',
        statusTitle: 'Status',
        overTitle: 'Game Over'
    },
    emojis: {
        xButton: '❌',
        oButton: '🔵',
        blankButton: '➖'
    },
    mentionUser: true,
    timeoutTime: 60000,
    xButtonStyle: 'DANGER',
    oButtonStyle: 'PRIMARY',
    turnMessage: '{emoji} |  **{player}** ist am Zug.',
    winMessage: '{emoji} | **{player}** hat das Spiel gewonnen!.',
    tieMessage: 'Unentschieden! Keiner hat gewonnen!',
    timeoutMessage: 'Das Spiel wurde nicht zu Ende gespielt! Keiner hat das Spiel gewonnen!',
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});