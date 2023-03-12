const { Minesweeper } = require('discord-gamecord');

const Game = new Minesweeper({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Minesweeper',
        color: '#5865F2',
        description: 'Klicken Sie auf die Schaltflächen, um die Blöcke mit Ausnahme der Minen aufzudecken.'
    },
    emojis: { flag: '🚩', mine: '💣' },
    mines: 5,
    timeoutTime: 60000,
    winMessage: 'Du hast das Spiel gewonnen! Du hast alle Minen erfolgreich umgangen.',
    loseMessage: 'Du hast das Spiel verloren! Hüte dich das nächste Mal vor den Minen.',
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});