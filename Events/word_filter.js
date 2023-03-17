const { Events, PermissionsBitField} = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    //Bots are allowed to spam
    if (message.author.bot) return;

    //Users with ManageMessages permission do not have a word filter
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

    //Check if bot has permission to perform actions
    if(!message.member.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;


    for (const word of message.content.split(' ')) {
      if (message.client.bannedWords[word.toLowerCase()]) {
        //console.log(`Found bad word ${word} in badword list at position ${message.client.bannedWords.indexOf(word.toLowerCase())} in message ${message.content}`);
        const msgToDelete = await message.reply("Deine Nachricht enthielt unangemessene Sprache und wurde gelöscht.");
        await message.delete();
        setTimeout(async () => {
          await msgToDelete.delete().catch(err => console.log(err));
        }, 3000);
        return;
      }
    }

  },
};