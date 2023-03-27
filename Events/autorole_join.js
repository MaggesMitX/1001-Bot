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

      //Check if guild has autorole feature entry
      if (!roleIdObject) return;
      if (!roleIdObject.autorole) return;

      const botRole = member.guild.members.me.roles.highest;
      const roleToAdd = member.guild.roles.cache.get(roleIdObject.autorole);

      //Check if role exists on server
      if (!roleToAdd) return;

      //Check if bot has permission to assign role
      if(botRole.position > roleToAdd.position) {
        await member.roles.add(roleIdObject.autorole);
        return;
      }
      //TODO: send error message
      //console.log("Fehler! Botrole ist zu niedrig!");


    } catch (error) {
      console.log(error);
    }
  },
};
