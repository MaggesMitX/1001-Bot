import { SlashCommandBuilder } from 'discord.js';
import { Slots } from 'discord-gamecord';
import {handleGameEnd} from "../../Utils/money.js";

export default {
  data: new SlashCommandBuilder().setName('slots').setDescription('Spiele Slots').setDMPermission(false),
  async execute(interaction) {
    const Game = new Slots({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Slot Machine',
        color: '#5865F2',
      },
      slots: ['🍇', '🍊', '🍋', '🍌'],
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
      handleGameEnd(interaction, result, "Slots", 10, 5);
    });
  },
};
