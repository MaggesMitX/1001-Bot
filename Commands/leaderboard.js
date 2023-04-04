import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

import {addMoney, removeMoney, getMoney} from "../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('leaderboard').setDescription('Sehe die Spieler mit dem meisten Vermögen'),
  async execute(interaction) {
      await interaction.deferReply();

      if (!interaction.client.prisma) {
          await interaction.editReply('Derzeit ist keine Datenbankverbindung aktiv!');
          return;
      }

      try {
          const response = await interaction.client.prisma.user.findMany({
              take: 10,
              orderBy: {
                      balance: 'desc',
                  },
          });

          if (Object.keys(response).length === 0)
              return interaction.editReply(`Es sind keine Spieler in der Datenbank registriert!`);


          const embed = new EmbedBuilder()
              .setTitle('1001 - Leaderboard')
              .setDescription(`Top 10 Spieler`)
              .setColor('#ffd600')
              .setTimestamp(Date.now())

          let i = 1;
          for (const player in response) {
              embed.addFields({
                  name: `#${i}`,
                  value: `${response[player].userid}`,
                  inline: false,
              });
              i++;
          }

          await interaction.editReply({
              embeds: [embed],
          });


      } catch (error) {
          console.log(error);
          await interaction.editReply('Beim Abrufen der Coins ist ein Fehler aufgetreten!');
      }

  },
};
