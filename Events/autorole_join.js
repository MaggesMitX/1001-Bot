import { Events, PermissionsBitField } from 'discord.js';

export default {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    //check if bot has permission to assign roles
    if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) return;

    //check if database object exists
    if (!member.client.prisma) return;

    try {
      const roleIdObject = await member.client.prisma.server.findUnique({
        where: {
          serverid: member.guild.id,
        },
        select: {
          autorole: true,
        },
      });

      if (!roleIdObject) return;
      if (!roleIdObject.autorole) return;

      const positionBotRole = member.guild.members.me.roles.highest.position

      const roleToAdd = member.guild.roles.cache.get(roleIdObject.autorole);

      if (!roleToAdd) return;

      if(positionBotRole > roleToAdd.position) {
        await member.roles.add(roleIdObject.autorole);
        return;
      }
      //console.log("Fehler! Botrole ist zu niedrig!");


    } catch (error) {
      console.log(error);
    }
  },
};
