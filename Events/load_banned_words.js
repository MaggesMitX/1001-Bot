const { Events, ActivityType } = require('discord.js');

const bannedWords = require('../banned_words.json').words;

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.bannedWords = [];
    bannedWords.map((word) => (client.bannedWords[word] = true));
  },
};
