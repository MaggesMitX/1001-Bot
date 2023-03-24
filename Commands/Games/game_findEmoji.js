import { SlashCommandBuilder } from 'discord.js';
import { FindEmoji } from 'discord-gamecord';

export default {
  data: new SlashCommandBuilder().setName('findemoji').setDescription('Spiele FindEmoji'),
  async execute(interaction) {
    const Game = new FindEmoji({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Finde das Emoji',
        color: '#5865F2',
        description: 'Erinnere dich an die Emojis auf der Tafel unten.',
        findDescription: 'Finde {emoji} bevor die Zeit abläuft!',
      },
      timeoutTime: 60000,
      hideEmojiTime: 5000,
      buttonStyle: 'PRIMARY',
      emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
      winMessage: 'Du hast gewonnen! Du hast {emoji} gefunden.',
      loseMessage: 'Du hast verloren! Du hast das falsche Emoji ausgewählt. {emoji}',
      timeoutMessage: 'Du hast verloren! Du hast keine Zeit mehr. Das Emoji war {emoji}',
      playerOnlyMessage: 'Nur {player} kann diese Schaltfläche verwenden.',
    });

    await Game.startGame();
    await Game.on('gameOver', (result) => {
      //console.log(result);  // =>  { result... }
    });
  },
};
