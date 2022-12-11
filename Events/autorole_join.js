const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(client) {

    const role = client.guild.roles.cache.get("1019231681024098304");
    await client.roles.add(role.id);
  },
};
