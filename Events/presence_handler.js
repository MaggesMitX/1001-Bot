const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const activityChangeInterval = 1000 * 60 * 5; // Alle 5 Minuten

    const botActivities = [
      {
        activity: { name: ' Fallschirm zum Verkauf, einmal benutzt, nie geöffnet!', type: ActivityType.Playing },
        status: 'online',
      },
      {
        activity: { name: 'In der Bibliothek schreien', type: ActivityType.Playing },
        status: 'online',
      },
      {
        activity: {
          name: '[Keyboard Interrupts]',
          type: ActivityType.Listening,},
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
          name: 'I’m not lazy, I’m on energy saving mode',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Isst in der Mensa',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Pokémon Go mit Max',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Minecraft Bedwars',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Spotting im Gym',
          type: ActivityType.Streaming,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Be the game-changer.',
          type: ActivityType.Streaming,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Error-404. Not found',
          type: ActivityType.Watching,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'mit brandgefährlichen C-Pointern 🔥',
          type: ActivityType.Competing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Einsätze Koordinieren 🔥',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Ai Funktionen überprüfen..',
          type: ActivityType.Watching,
        },
        status: 'dnd',
      },
      {
        activity: {
          name: 'to Spotify',
          type: ActivityType.Listening,},
        status: 'online',
      }
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
