const { SlashCommandBuilder} = require('discord.js');
const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rockpaperscissor')
        .setDescription('Spiele Schere, Stein, Papier')
        .setNameLocalizations({
            de: 'scheresteinpapier',
        })
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
                description: 'Wähle über die Buttons deine Auswahl!'
            },
            buttons: {
                rock: 'Stein',
                paper: 'Papier',
                scissors: 'Schere',
                accept: 'Annehmen',
                reject: 'Ablehnen'
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
            requestMessage: '{player} hat dich zu **Schere Stein Papier** eingeladen.',
            rejectMessage: 'Der Spieler hat deine Einladung zu **Schere Stein Papier** abgelehnt.',
            playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
            reqTimeoutMessage: 'Der Spieler hat die Einladung nicht rechtzeitig angenommen.',
        });

        await Game.startGame();
        await Game.on('gameOver', result => {
            //console.log(result);  // =>  { result... }
        });
    }
}