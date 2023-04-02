import { SlashCommandBuilder } from 'discord.js';
import { Flood } from 'discord-gamecord';
import {addMoney, removeMoney, getMoney} from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('flood').setDescription('Spiele Flood').setDMPermission(false),
  async execute(interaction) {


    const Game = new Flood({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Fülle das Spielfeld mit einer Farbe!',
        color: '#5865F2',
      },
      difficulty: 13,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
      winMessage: 'Du hast gewonnen! Züge: **{turns}**',
      loseMessage: 'Du hast verloren! Züge: **{turns}**',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
    await Game.on('gameOver', async (result) => {
      //console.log(result);  // =>  { result... }
      if (result.result === 'win') {
        await addMoney(interaction.client.prisma, interaction.user.id, 20, "Win Flood");
        await interaction.followUp({content: "Du hast 20 Coins erhalten!", ephemeral: true});
        return;
      }

      const userMoney = await getMoney(interaction.client.prisma, interaction.user.id);

      if (userMoney < 15) {
        await interaction.followUp({content: "Du kannst deine Schulden nicht mehr bezahlen!", ephemeral: true});
        return;
      }

      await removeMoney(interaction.client.prisma, interaction.user.id, 15, "Lose Flood");
      await interaction.followUp({content: "Du hast 15 Coins verloren!", ephemeral: true});


    });
  },
};
