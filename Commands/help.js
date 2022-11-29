const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('help').setDescription('Öffnet die Hilfe mit allen Befehlen'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('Hilfe')
      .setDescription('Eine Liste mit allen Befehlen.')
      .setColor('Random')
      .setTimestamp(Date.now())
      .addFields(
        {
          name: '/info',
          value: 'Zeigt dir noch unbekanntes an.',
          inline: true,
        },
        {
          name: '/psso',
          value: 'Der Weg zum PSSO System,',
          inline: true,
        },
        {
          name: '/mensa',
          value: 'Falls du wissen willst, was es morgen zu Essen gibt, gibt /mensa [Datum] ein!',
          inline: true,
        }
      );

    await interaction.reply({
      embeds: [embed],
    });
  },
};
