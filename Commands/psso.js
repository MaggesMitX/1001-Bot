const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('psso').setDescription('Hier gibts einen Link zum PSSO System'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
          .setTitle('Prüfungs- und Studierendenservice Online')
          .setDescription('Schau mal nach, was es hier gibt..')
          .setColor('Random')
          .setTimestamp(Date.now())
          .addFields({
            name: 'Link:',
            value: 'https://psso.th-koeln.de/qisserver/rds?state=user&type=0',
            inline: true
          });

          await interaction.reply({
            embeds : [embed]
          })
  },
};