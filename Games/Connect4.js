const { Connect4 } = require('discord-gamecord');

const Game = new Connect4({
    message: message,
    isSlashGame: false,
    opponent: message.mentions.users.first(),
    embed: {
        title: 'Verbinde4 Spiel',
        statusTitle: 'Status',
        color: '#5865F2'
    },
    emojis: {
        board: '⚪',
        player1: '🔴',
        player2: '🟡'
    },
    mentionUser: true,
    timeoutTime: 60000,
    buttonStyle: 'PRIMARY',
    turnMessage: '{emoji} | **{player}** Spielzug.',
    winMessage: '{emoji} | **{player}** hat Verbinde4 gewonnen.',
    tieMessage: 'Das Spiel steht unentschieden! Keiner hat das Spiel gewonnen!',
    timeoutMessage: 'Das Spiel wurde nicht zu Ende gespielt! Keiner hat das Spiel gewonnen!',
    playerOnlyMessage: 'Nur {player} und {opponent} können diese Schaltflächen verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});