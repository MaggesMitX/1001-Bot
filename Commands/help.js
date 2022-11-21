const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('help').setDescription('Öffnet die Hilfe mit allen Befehlen'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
          .setTitle('Hilfe')
          .setDescription('Eine Liste mit allen Befehlen.')
          .setColor(0x18e1ee)
          //.setImage(client.user.displayAvatarURL())
          //.setThumbnail(client.user.displayAvatarURL())
          .setTimestamp(Date.now())
          //.setFooter({
          //  iconURL: client.user.displayAvatarURL(),
          //  text: client.user.tag
          //})
          .addFields({
            name: '/info',
            value: 'Zeigt dir noch unbekanntes an.',
            inline: true
          },
          {
            name: '/PSSO',
            value: 'Der Weg zum PSSO System,',
            inline: true
          },
          {
            name: '/Kantine',
            value: 'Hier kannst du dir den Speiseplan angucken.',
            inline: true
          });

          await interaction.reply({
            embeds : [embed]
          })
  },
};
