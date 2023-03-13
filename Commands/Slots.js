const { SlashCommandBuilder} = require('discord.js');
const { Slots } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Spiele Slots'),
    async execute(interaction){
        const Game = new Slots({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: 'Slot Machine',
                color: '#5865F2'
            },
            slots: ['🍇', '🍊', '🍋', '🍌']
        });

        await Game.startGame();
         await Game.on('gameOver', result => {
             interaction.editReply('Verloren')
             console.log(result);  // =>  { result... }
        });
    }
}
