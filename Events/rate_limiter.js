const { Events, PermissionsBitField } = require('discord.js');

const rateLimitInterval = 3000;
const rateLimitMaxMessages = 3;
const resetInterval = 10000;
const timeoutLength = 9000;

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    //Bots are allowed to spam
    if (message.author.bot) return;

    //Users with ManageMessages permission do not have a rate limit
    if (message.member.permissionsIn(message.channel).has(PermissionsBitField.Flags.ModerateMembers)) return;

    //Check if bot has permission to perform actions
    if(!message.member.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;
    if(!message.member.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return;

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
