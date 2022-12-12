const { Events } = require('discord.js');
const { guildId } = require('../config.json');

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {

    if(member.guild.id !== guildId) return;

    const role = member.guild.roles.cache.get("1019231681024098304");
    await member.roles.add(role.id);
  },
};
