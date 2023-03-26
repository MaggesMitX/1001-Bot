import { SlashCommandBuilder, PermissionsBitField } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Einstellungen für den 1001 Bot')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('roleid')
        .setDescription('Setze die Rollen ID, welche User beim Joinen erhalten sollen. Zum Entfernen 0 benutzten!')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    let serverId = interaction.guild.id.toString();
    let serverName = interaction.guild.name;
    let roleId = interaction.options.get('roleid')?.value.trim();

    const removeKeywords = ["null", "0", "remove"];

    if (removeKeywords.indexOf(roleId) > -1) {
      try {
        await interaction.client.prisma.server.upsert({
          where: {
            serverid: serverId,
          },
          update: {
            //wenn Eintrag existiert
            autorole: null,
          },
          create: {
            //wenn kein Eintrag existiert
            serverid: serverId,
            name: serverName,
            autorole: null,
          },
        });

        await interaction.editReply(`Der Eintrag für ${serverName} wurde gelöscht!`);
      } catch (error) {
        await interaction.editReply('Es ist ein Fehler beim Löschen der AutoRole aufgetreten!');
        console.log(error);
      }
      return;
    }

    if (!interaction.guild.roles.cache.get(roleId)) {
      await interaction.editReply('Die Gruppe wurde nicht gefunden!');
      return;
    }

    //check if database object exists
    if (!interaction.client.prisma) {
      await interaction.editReply('Derzeit besteht keine Datenbankverbindung!');
      return;
    }

    try {
      await interaction.client.prisma.server.upsert({
        where: {
          serverid: serverId,
        },
        update: {
          //wenn Eintrag existiert
          autorole: roleId,
        },
        create: {
          //wenn kein Eintrag existiert
          serverid: serverId,
          name: serverName,
          autorole: roleId,
        },
      });

      await interaction.editReply(`Es wurde ein Eintrag für ${serverName} mit dem Wert ${roleId} erstellt.`);
    } catch (error) {
      await interaction.editReply('Es ist ein Fehler beim Setzen der AutoRole aufgetreten!');
      console.log(error);
    }
  },
};
