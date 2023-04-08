import { Events } from 'discord.js';
import * as bannedWordList from '../banned_words.json' assert { type: 'json' };
import * as gameStrings from '../gameStrings.json' assert { type: 'json' };

export default {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.customWords = [...gameStrings.default.hangmanWords];
    client.fastTypeText = [...gameStrings.default.fastTypeText];
    client.bannedWords = [];
    client.rateLimiter = new Map();
    bannedWordList.default.words.map((word) => (client.bannedWords[word] = true));
  },
};
