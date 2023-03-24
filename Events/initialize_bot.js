import { Events } from 'discord.js';
import * as bannedWordList from '../banned_words.json' assert { type: 'json' };
import * as customWordList from '../custom_words.json' assert { type: 'json' };

export default {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.customWords = [...customWordList.default.words];
    client.bannedWords = [];
    client.rateLimiter = new Map();
    bannedWordList.default.words.map((word) => (client.bannedWords[word] = true));
  },
};
