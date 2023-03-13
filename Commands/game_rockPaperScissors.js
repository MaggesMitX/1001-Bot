const { SlashCommandBuilder} = require('discord.js');
const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rockpaperscissor')
        .setDescription('Spiele Schere, Stein, Papier')
        .addUserOption((option) =>
            option
                .setName('member')
                .setDescription('Gegner')
        ),
    async execute(interaction) {

        const target = interaction.options.getUser('member');

        if (!target) {
            return interaction.reply(
                'Es wurde kein Mitspieler angegeben!'
            );
        }

        const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: target,
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
            winMessage: '**{player}** hat das Spiel gewonnen, herzlichen Glückwunsch!',
            tieMessage: 'Unentschieden! Keiner hat gewonnen!',
            timeoutMessage: 'Das Spiel wurde nicht zu Ende gespielt! Keiner hat das Spiel gewonnen!',
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.'
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            //console.log(result);  // =>  { result... }
        });
    }
}