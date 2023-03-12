const { FindEmoji } = require('discord-gamecord');

const Game = new FindEmoji({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Find Emoji',
        color: '#5865F2',
        description: 'Erinnere dich an die Emojis auf der Tafel unten.',
        findDescription: 'Finde {emoji} bevor die Zeit abläuft!'
    },
    timeoutTime: 60000,
    hideEmojiTime: 5000,
    buttonStyle: 'PRIMARY',
    emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
    winMessage: 'Du hast gewonnen! Du hast {emoji} gefunden.',
    loseMessage: 'Du hast verloren! Du hast das falsche Emoji ausgewählt. {emoji}',
    timeoutMessage: 'Du hast verloren! Du hast keine Zeit mehr. Das Emoji war {emoji}',
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});