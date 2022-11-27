const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('kantine').setDescription('Gucke was es morgen zu essen gibt'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
          .setTitle('KSTW-Kantine')
          .setDescription('Ich hab da was gefunden..')
          .setColor('Random')
          .setTimestamp(Date.now())
          .addFields({
            name: 'Link:',
            value: 'https://www.kstw.de/mensa/standort-gummersbach',
            inline: true
          });

          await interaction.reply({
            embeds : [embed]
          })
  },
};