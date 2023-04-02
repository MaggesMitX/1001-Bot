import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

import {addMoney, removeMoney, getMoney} from "../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('balance').setDescription('Verwalte deine virtuelle Währung'),
  async execute(interaction) {
      await interaction.deferReply();

      if (!interaction.client.prisma) {
          await interaction.editReply('Derzeit ist keine Datenbankverbindung aktiv!');
          return;
      }


      try {
         const money = await getMoney(interaction.client.prisma, interaction.user.id);

         const embed = new EmbedBuilder()
              .setTitle('1001 - Money')
              .setColor('#a96e2b')
              .setTimestamp(Date.now())
              .addFields({
                  name: `Geld von ${interaction.user.username}#${interaction.user.discriminator}`,
                  value: `${money}`,
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
