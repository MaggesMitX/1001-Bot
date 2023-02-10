const { Events } = require('discord.js');
const botServerRoles = require('../botServers.json').serverRoles; // hier Einträge aus JSON Datei einlesen

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    const role = botServerRoles[member.guild.id];
    if(!role) return; // Hier könnte man auch einen Fehler ausgeben.
    await member.roles.add(role);
  },
};