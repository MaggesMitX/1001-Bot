const { Events } = require('discord.js');
const botServerRoles = require('../botServers.json').serverRoles; // hier Einträge aus JSON Datei einlesen

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    //TODO: check if bot has permission to add roles to members
    //    if(!message.member.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) return;

    const role = botServerRoles[member.guild.id];

    if(!role) return;

    await member.roles.add(role);
  },
};