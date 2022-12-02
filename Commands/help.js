const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Öffnet die Hilfe mit allen Befehlen'),
  async execute(interaction) {
    const { commands } = interaction.client;

    const embed = new EmbedBuilder()
      .setTitle('Hilfe')
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setDescription('Eine Liste mit allen Befehlen!')
      .setColor('Random')
      .setTimestamp(Date.now());

    commands.map((command) => {
      embed.addFields({
        name: command.data.name,
        value: command.data.description,
        inline: false,
      });
    });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
