import { SlashCommandBuilder } from 'discord.js';
import { Slots } from 'discord-gamecord';
import { handleGameEnd, getMoney } from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('slots').setDescription('Spiele Slots').setDMPermission(false)
      .addIntegerOption((option) => option.setName("einsatz").setDescription("Wähle einen Wert zwischen 1 und 999999").setMinValue(1).setMaxValue(999999)),
  async execute(interaction) {
    await interaction.deferReply();

    const inputMoney = interaction.options.get('einsatz')?.value;

    if(inputMoney) {
      const userMoney = await getMoney(interaction.client.prisma, interaction.user.id);
      if(userMoney < inputMoney) {
        await interaction.editReply('Du hast nicht so viel Geld auf deinem Konto! 😕');
        return;
      }
    }

    const coinText = inputMoney === 1 ? 'Coin' : 'Coins';

    const embed = {
      title: inputMoney ? `Slot Machine (${inputMoney} ${coinText})` : 'Slot Machine',
      color: '#5865F2',
    }

    const Game = new Slots({
      message: interaction,
      isSlashGame: true,
      embed,
      slots: ['🍇', '🍊', '🍋', '🍌'],
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
      handleGameEnd(interaction, result, "Slots", inputMoney ? inputMoney * 2 : 5, inputMoney ? inputMoney : 5);
    });
  },
};
