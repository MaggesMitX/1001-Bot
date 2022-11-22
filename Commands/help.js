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
            value: 'Hier steht immernoch nichts',
            inline: true
          },
          {
            name: '/PSSO',
            value: 'Der Weg zum PSSO System,',
            value: 'https://psso.th-koeln.de/qisserver/rds?state=user&type=0',
            inline: true
          },
          {
            name: '/Kantine',
            value: 'Alle nützlichen Informationen über die Kantine findest du hier',
            value:'https://www.kstw.de/allgemein/standort-gummersbach?searchterm=Gummersbach',
            inline: true
          });

          await interaction.reply({
            embeds : [embed]
          })
  },
  data: new SlashCommandBuilder().setName('kantine').setDescription('Alle nützlichen Informationen über die Kantine findest du hier'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
          .setTitle('Kantine')
          .setDescription('Schau mal nach was es heute zu essen gibt')
          .setColor(0x18e1ee)
          //.setImage(client.user.displayAvatarURL())
          //.setThumbnail(client.user.displayAvatarURL())
          .setTimestamp(Date.now())
          //.setFooter({
          //  iconURL: client.user.displayAvatarURL(),
          //  text: client.user.tag
          //})
          .addFields({
            value:'https://www.kstw.de/allgemein/standort-gummersbach?searchterm=Gummersbach',
            inline: true
          });

          await interaction.reply({
            embeds : [embed]
          })
  },
  data: new SlashCommandBuilder().setName('psso').setDescription('Hier gibts einen Link zum PSSO System'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
          .setTitle('Prüfungs- und Studierendenservice Online')
          .setDescription('Schau mal nach was es hier gibt..')
          .setColor(0x18e1ee)
          //.setImage(client.user.displayAvatarURL())
          //.setThumbnail(client.user.displayAvatarURL())
          .setTimestamp(Date.now())
          //.setFooter({
          //  iconURL: client.user.displayAvatarURL(),
          //  text: client.user.tag
          //})
          .addFields({
            value:'https://psso.th-koeln.de/qisserver/rds?state=user&type=0',
            inline: true
          });

          await interaction.reply({
            embeds : [embed]
          })
  },
};
