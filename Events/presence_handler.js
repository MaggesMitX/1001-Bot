import { Events, ActivityType } from 'discord.js';

export default {
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
        activity: { name: `Currently in ${client.guilds.cache.size} servers `, type: ActivityType.Playing },
        status: 'online',
      },
      {
        activity: { name: 'Elden Ring', type: ActivityType.Playing },
        status: 'online',
      },
      {
        activity: {
          name: '[Keyboard Interrupts]',
          type: ActivityType.Listening,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Mathe 2 Vorlesungen',
          type: ActivityType.Watching,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'fecten mit Burak',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Schach',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Zelda durch Akkala hetzen',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Coding mit Kai',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'GYM Live!',
          type: ActivityType.Streaming,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Nicks Coding Lessons',
          type: ActivityType.Streaming,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'TH Köln Memes',
          type: ActivityType.Watching,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'gegen die Zeit🔥',
          type: ActivityType.Competing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Nachrichten lesen',
          type: ActivityType.Playing,
        },
        status: 'online',
      },
      {
        activity: {
          name: 'Youtube Tutorials',
          type: ActivityType.Watching,
        },
        status: 'dnd',
      },
      {
        activity: {
          name: 'to Spotify',
          type: ActivityType.Listening,
        },
        status: 'online',
      },
    ];

    setInterval(() => {
      const randomActivity = botActivities[Math.floor(Math.random() * botActivities.length)];

      client.user.setPresence({
        activities: [randomActivity.activity],
        status: randomActivity.status,
        type: randomActivity.type,
      });
    }, activityChangeInterval);
  },
};
