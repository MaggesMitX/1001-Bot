const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {

    const role = member.guild.roles.cache.get("1019231681024098304");
    await member.roles.add(role.id);
  },
};
