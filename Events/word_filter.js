const { Events, PermissionsBitField} = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    //Bots are allowed to spam
    if (message.author.bot) return;

    //ManageMessages users are bypassed
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

    for (const word of message.content.split(' ')) {
      if (message.client.bannedWords[word.toLowerCase()]) {
        const msgToDelete = await message.reply("Deine Nachricht enthielt unangemessene Sprache und wurde gelöscht.").catch(err => console.log(err));
        await message.delete();
        setTimeout(async () => {
          await msgToDelete.delete().catch(err => console.log(err));
        }, 3000);
        return;
      }
    }

  },
};