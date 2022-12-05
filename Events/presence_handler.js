const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const activityChangeInterval = 1000 * 60 * 5; // Alle 5 Minuten

    const botActivities = [
      {
        activity: { name: 'MA1 Vorlesung', type: ActivityType.Watching },
        status: 'online',
      },
      {
        activity: { name: 'AP1 Vorlesung', type: ActivityType.Watching },
        status: 'online',
      },
      {
        activity: {
          name: 'Verzweifelt an der Mathe-Übung',
          type: 4,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Mathe(by Daniel Jung)',
          type: ActivityType.Watching,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Exmatrikulations PDF´s',
          type: ActivityType.Watching,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Isst in der Mensa',
          type: 4,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Pokémon in EBR',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Minecraft 1vs1 mit Kai',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'am Getränkeautomaten im Gym',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'mit Snapshots von Franky',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'mit brandgefährlichen C-Pointern 🔥',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
    ];

    setInterval(() => {
      const randomActivity =
        botActivities[Math.floor(Math.random() * botActivities.length)];

      client.user.setPresence({
        activities: [randomActivity.activity],
        status: randomActivity.status,
        type: randomActivity.type,
      });
    }, activityChangeInterval);
  },
};
