const { Events } = require('discord.js');


module.exports = {
  name: Events.GuildUpdate,
  once: false,
  async execute(guild) {
    //check if database object exists
    if(!guild.client.prisma) return;

    let oldName = guild.name;
    let newName = guild.commands.guild.name; //keine Ahnung wieso

    if(oldName === newName) return;

    try {
      await guild.client.prisma.server.upsert({
        where: {
          serverid: guild.id,
        },
        update: { //wenn Eintrag existiert
          name: newName,
        },
        create: { //wenn kein Eintrag existiert
          serverid: guild.id,
          name: newName,
        },
      });
    } catch (error) {
      console.log(error);
    }

  },
};