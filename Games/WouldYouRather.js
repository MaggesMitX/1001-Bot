const { WouldYouRather } = require('discord-gamecord');

const Game = new WouldYouRather({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Würdest du eher..',
        color: '#5865F2',
    },
    buttons: {
        option1: 'Option 1',
        option2: 'Option 2',
    },
    timeoutTime: 60000,
    errMessage: 'Es können keine Fragedaten abgerufen werden! Bitte versuche es erneut.',
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();