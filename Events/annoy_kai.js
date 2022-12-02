const { Events } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message) {
    if (message.author.id !== '242572742518505472') return;
    message.react('🇦');
    message.react('🇲');
    message.react('🇴');
    message.react('🇬');
    message.react('🇺');
    message.react('🇸');
  },
};
