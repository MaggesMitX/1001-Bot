const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    for (const word of message.content.split(' ')) {
      if (message.client.bannedWords[word.toLowerCase()]) {
        await message.reply('Deine Nachricht enthielt unangemessene Sprache und wurde gelöscht.');
        await message.delete();
        return;
      }
    }
  },
};
