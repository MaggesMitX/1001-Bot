import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('balance').setDescription('Verwalte deine virtuelle Währung'),
  async execute(interaction) {
      await interaction.deferReply();

      if(!interaction.client.prisma) {
          await interaction.editReply('Derzeit ist keine Datenbankverbindung aktiv!');
          return;
      }


      try {
          const response = await interaction.client.prisma.currency.upsert({
              where: {
                  userid: interaction.user.id,
              },
              update: {},
              create: {
                  userid: interaction.user.id,
                  currency: 0,
              },
          });

          if(!response) {
              await interaction.editReply('Es ist ein Fehler beim Abfragen aufgetreten!');
              return;
          }


          const embed = new EmbedBuilder()
              .setTitle('1001 - Money')
              .setColor('#a96e2b')
              .setTimestamp(Date.now())
              .addFields({
                  name: `Geld von ${interaction.user.username}#${interaction.user.discriminator}`,
                  value: `${response.currency}`,
                  inline: true,
              });

            await interaction.editReply({
              embeds: [embed],
            });


      } catch (error) {
          console.log(error);
          await interaction.editReply('Beim Abrufen der Coins ist ein Fehler aufgetreten!');
      }

  },
};
