const { Events } = require('discord.js');

const { prisma } = require('../main.js');

module.exports = {
  name: Events.GuildUpdate,
  once: false,
  async execute(guild) {


    await prisma.server.upsert({
      where: {
        serverid: guild.id,
      },
      update: { //wenn Eintrag existiert
        name: guild.name,
      },
      create: { //wenn kein Eintrag existiert
        serverid: guild.id,
        name: guild.name,
        autorole: null,
      },
    });

  },
};