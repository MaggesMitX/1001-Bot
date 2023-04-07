import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('gamelist').setDescription('Erforsche alle meine Spiele').setDMPermission(false),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Spiele, die du spielen kannst')
      .setThumbnail('https://cdn.discordapp.com/avatars/1044182620159869018/6196a533092726668486a50815a4b04d.webp')
      .setDescription('Bitte gib /[Spiel] ein, um es zu starten!')
      .setColor('Random')
      .setTimestamp(Date.now())
      .addFields({
        name: '2048',
        value: 'Spiele das legendäre 2048 im Chat!',
        inline: true,
      })
      .addFields({
        name: 'Connect4',
        value: 'Spiele Connect4 mit deinen Freunden! (Duo-Modus)',
        inline: true,
      })
      .addFields({
        name: 'FastType',
        value: 'Tippe den vorgegeben Text ab, so schnell wie du kannst!',
        inline: true,
      })
      .addFields({
        name: 'FindEmoji',
        value: 'Gehe auf Jagd und suche die Emojis.',
        inline: true,
      })
      /*  .addFields({
                name: 'Fishy',
                value: 'Gehe zum Entspannen einfach mal fischen.',
                inline: true
            })*/
      .addFields({
        name: 'Flood',
        value: 'Spiele mit den Farben!',
        inline: true,
      })
      .addFields({
        name: 'GuessThePokemon',
        value: 'Wenn du ein Pokemon Fan bist, wirst du dieses Spiel lieben!',
        inline: true,
      })
      .addFields({
        name: 'Hangman',
        value: 'Spiele Hangman mit deinen Freunden.',
        inline: true,
      })
      .addFields({
        name: 'MatchPairs',
        value: 'Finde alle Paare.',
        inline: true,
      })
      .addFields({
        name: 'Minesweeper',
        value: 'Jeder kennt Minesweeper, wir haben es!',
        inline: true,
      })
      .addFields({
        name: 'SchereSteinPapier',
        value: 'Schere, Stein, Papier! (Duo-Modus)',
        inline: true,
      })
      .addFields({
        name: 'Slots',
        value: 'Slots für unsere Spielsüchtigen.',
        inline: true,
      })
      .addFields({
        name: 'Snake',
        value: 'Sammle so viele Punkte wie möglich in Snake.',
        inline: true,
      })
      .addFields({
        name: 'TicTacToe',
        value: 'Spiele TicTacToe gegen deine Freunde! (Duo-Modus)',
        inline: true,
      })
      .addFields({
        name: 'Trivia',
        value: 'Richtig oder Falsch? Bist du schlau genug für den Bot?',
        inline: true,
      })
      .addFields({
        name: 'Wordle',
        value: 'Errate ein zufälliges Wort in Wordle.',
        inline: true,
      })
      .addFields({
        name: 'WouldYouRather',
        value: 'Das oder das? Hier kannst du Würdest du eher... mit deinen Freunden spielen!',
        inline: true,
      });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
