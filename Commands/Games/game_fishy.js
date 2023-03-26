import { SlashCommandBuilder } from 'discord.js';
import { Fishy } from 'discord-gamecord';
const player = {};

export default {
  data: new SlashCommandBuilder().setName('fishy').setDescription('Spiele Fishy').setDMPermission(false),
  async execute(interaction) {
    await interaction.reply('Dieses Spiel wurde noch nicht veröffentlicht! ⛔');

    /*
        const Game = new Fishy({
            message: interaction,
            isSlashGame: true,
            player: player,
            embed: {
                title: 'Fishy Inventar',
                color: '#5865F2'
            },
            fishes: {
                junk: { emoji: '🔧', price: 5 },
                common: { emoji: '🐟', price: 10 },
                uncommon: { emoji: '🐠', price: 20 },
                rare: { emoji: '🐡', price: 50 }
            },
            fishyRodPrice: 10,
            catchMessage: 'Du hast einen {fish} gefangen. Du hast {amount} für die Angel gezahlt.',
            sellMessage: 'Du hast {amount}x {emoji} {type} Items für einen Preis von {price} verkauft.',
            noBalanceMessage: 'Du hast nicht genug Guthaben, um eine Angel zu mieten.',
            invalidTypeMessage: 'Die Fischart kann nur Junk, Common, Uncommon oder Rare sein.',
            invalidAmountMessage: 'Der Betrag muss zwischen 0 und dem Höchstbetrag für Fisch liegen.',
            noItemMessage: 'Du hast diesen Gegenstand nicht in deinem Inventar.'
        });


// Catch Fish
        await Game.catchFish();
        await Game.on('catchFish', fishy => { player = fishy.player });

// Sell Fish
        //Game.sellFish(fishType, amount);
        await Game.on('sellFish', fishy => { player = fishy.player });
// FishType: junk || common || uncommon || rare

// PLayer Inventory
        await Game.fishyInventory();
		*/
  },
};
