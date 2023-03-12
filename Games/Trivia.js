const { Trivia } = require('discord-gamecord');

const Game = new Trivia({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Trivia',
        color: '#5865F2',
        description: 'Du hast 60 Sekunden Zeit um die Antwort zu erraten!'
    },
    timeoutTime: 60000,
    buttonStyle: 'PRIMARY',
    trueButtonStyle: 'SUCCESS',
    falseButtonStyle: 'DANGER',
    mode: 'multiple',  // multiple || single
    difficulty: 'medium',  // easy || medium || hard
    winMessage: 'Gewonnen! The richtige Antwort ist {answer}.',
    loseMessage: 'Leider verloren! Die richtige Antwort wäre {answer}.',
    errMessage: 'Es können keine Fragedaten abgerufen werden! Bitte versuche es erneut.',
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});