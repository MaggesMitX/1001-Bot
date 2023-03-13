const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('gamelist').setDescription('Erforsche alle meine Spiele'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('Spiele die du spielen kannst')
            .setThumbnail('https://cdn.discordapp.com/avatars/1044182620159869018/6196a533092726668486a50815a4b04d.webp?')
            .setDescription('Bitte gebe /[Spiel] ein um es zu starten!')
            .setColor('Random')
            .setTimestamp(Date.now())
            .addFields({
                name: '2048',
                value: 'Spiele das legendäre 2048 im Chat!',
                inline: true
            })
            .addFields({
            name: 'Connect4',
            value: 'Spiele Connect4 mit deinen Freunden!',
            inline: true
             })
            .addFields({
                name: 'Emojify',
                value: 'Erzeugt dir ein Emoji',
                inline: true
            })
            .addFields({
                name: 'FastType',
                value: 'Tippe dem vorgegeben Text hinterher so schnell wie du kannst!',
                inline: true
            }).addFields({
                name: 'FindEmoji',
                value: 'Gehe auf Jagd und suche die Emojis.',
                inline: true
            })
            .addFields({
                name: 'Fishy',
                value: 'Gehe zum entspannen einfach mal fischen.',
                inline: true
            })
            .addFields({
                name: 'Flood',
                value: 'Spiele mit den Farben!',
                inline: true
            })
            .addFields({
                name: 'GuessThePokemon',
                value: 'Wenn du ein Pokemon Fan bist wirst du dieses Spiel Lieben!',
                inline: true
            })
            .addFields({
                name: 'Hangman',
                value: 'Spiele Hangman mit deinen Freunden.',
                inline: true
            })
            .addFields({
                name: 'MatchPairs',
                value: 'Finde alle Paare.',
                inline: true
            })
            .addFields({
                name: 'Minesweeper',
                value: 'Jeder kennt Minesweeper, wir haben es!',
                inline: true
            })
            .addFields({
                name: 'RockPaperScissors',
                value: 'Schere, Stein, Papier',
                inline: true
            })
            .addFields({
                name: 'Slots',
                value: 'Slots für unsere Spielsüchtigen.',
                inline: true
            })
            .addFields({
                name: 'Snake',
                value: 'Sammel so viele Punkte wie möglich in Snake.',
                inline: true
            })
            .addFields({
                name: 'TicTacToe',
                value: 'Spiele TicTacToe gegen deine Freunde.',
                inline: true
            })
            .addFields({
                name: 'Trivia',
                value: 'Richtig oder Falsch? Bist du schlau genug für den Bot?',
                inline: true
            })
            .addFields({
                name: 'Wordle',
                value: 'Errate ein zufälliges Wort in wordle.',
                inline: true
            })
            .addFields({
                name: 'WouldYouRather',
                value: 'Das oder das? Hier kannst du würdest du eher mit deinen Freunden spielen!',
                inline: true
            })
        ;
        await interaction.reply({
            embeds : [embed]
        })
    },
};