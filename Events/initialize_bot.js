const { Events } = require('discord.js');
const bannedWords = require('../banned_words.json').words;
const customWords = require('../custom_words.json').words;

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.customWords = [...customWords];
    client.bannedWords = [];
    client.rateLimiter = new Map();
    bannedWords.map((word) => (client.bannedWords[word] = true));
  },
};
