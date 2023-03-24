const { Events, PermissionsBitField} = require('discord.js');

const { prisma } = require('../main.js');

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    //TODO: check if bot has permission to assign roles
   // if(!member.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) return;

    if(!prisma) {
      return;
    }

    try {
      const roleId = await prisma.server.findUnique({
        where: {
          serverid: member.guild.id,
        },
        select: {
          autorole: true,
        }
      });

      if(!roleId) return;
      if(!roleId.autorole) return;

      await member.roles.add(roleId.autorole);
    } catch (error) {
      console.log(error);
    }


  },
};