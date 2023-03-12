const { RockPaperScissors } = require('discord-gamecord');

const Game = new RockPaperScissors({
    message: message,
    isSlashGame: false,
    opponent: message.mentions.users.first(),
    embed: {
        title: 'Schere, Stein, Papier',
        color: '#5865F2',
        description: 'Press a button below to make a choice.'
    },
    buttons: {
        rock: 'Rock',
        paper: 'Paper',
        scissors: 'Scissors'
    },
    emojis: {
        rock: '🌑',
        paper: '📰',
        scissors: '✂️'
    },
    mentionUser: true,
    timeoutTime: 60000,
    buttonStyle: 'PRIMARY',
    pickMessage: 'Dein Zug {emoji}.',
    winMessage: '**{player}** hat das Spiel gewonnen, Herzlichen Glückwunsch!',
    tieMessage: 'Unentschieden! Keiner hat gewonnen!',
    timeoutMessage: 'Das Spiel wurde nicht zu Ende gespielt! Keiner hat das Spiel gewonnen!',
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});