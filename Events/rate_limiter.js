const { Events, PermissionsBitField } = require('discord.js');

const rateLimitInterval = 3000;
const rateLimitMaxMessages = 3;
const resetInterval = 10000;
const timeoutLength = 9000;

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    if (message.member.permissionsIn(message.channel).has(PermissionsBitField.Flags.Administrator)) return;

    const user = await message.guild.members.fetch(message.member.user);
    const client = message.client;
    const userData = client.rateLimiter.get(user.id);

    if (!userData) {
      return client.rateLimiter.set(user.id, {
        timestamp: Date.now(),
        messagsSent: 1,
      });
    }

    const timeSinceLastMessage = Date.now() - userData.timestamp;

    if (timeSinceLastMessage > resetInterval) userData.messagsSent = 0;
    if (timeSinceLastMessage < rateLimitInterval) userData.messagsSent++;

    if (userData.messagsSent > rateLimitMaxMessages) {
      await message.reply('Bitte passe deine Chatgeschwindigkeit an! 🤠');
      await user.timeout(
        timeoutLength,
        `Der User ${user.user.username}#${user.user.discriminator} (${user.user.id}) wurde für ${
          timeoutLength / 1000
        } Sekunden wegen Spamming getimeouted.`
      ).catch(error =>{
        console.log(error);
      });
    }

    client.rateLimiter.set(user.id, { ...userData, timestamp: Date.now() });
  },
};
