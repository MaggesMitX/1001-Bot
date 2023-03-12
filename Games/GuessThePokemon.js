const { GuessThePokemon } = require('discord-gamecord');

const Game = new GuessThePokemon({
    message: message,
    isSlashGame: false,
    embed: {
        title: 'Who\'s that Pokémon',
        color: '#5865F2'
    },
    timeoutTime: 60000,
    winMessage: 'Richtig! Es war ein {pokemon}.',
    loseMessage: 'Leider falsch, richtig wäre {pokemon}.',
    errMessage: 'Pokémon-Sammlung nicht verfügbar, bitte versuchen es erneut.',
    playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
});

Game.startGame();
Game.on('gameOver', result => {
    console.log(result);  // =>  { result... }
});