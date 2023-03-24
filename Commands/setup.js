const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Einstellungen für den 1001 Bot')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDMPermission(false)
        .addStringOption((option) =>
            option.setName('serverid').setDescription('Setze die Rollen ID, welche User beim Joinen erhalten sollen').setRequired(true),
        ),

    async execute(interaction) {
            await interaction.deferReply();

            let serverId = interaction.guild.id.toString();
            let serverName = interaction.guild.name;
            let roleId = interaction.options.get('serverid')?.value.trim();

            if(!interaction.guild.roles.cache.get(roleId)) {
                await interaction.editReply("Die Gruppe wurde nicht gefunden!");
                return;
            }

            //check if database object exists
            if(!interaction.client.prisma) {
                await interaction.editReply("Derzeit besteht keine Datenbankverbindung!");
                return;
            }

            try {
                await interaction.client.prisma.server.upsert({
                    where: {
                      serverid: serverId
                    },
                    update: { //wenn Eintrag existiert
                        autorole: roleId,
                    },
                    create: { //wenn kein Eintrag existiert
                        serverid: serverId,
                        name: serverName,
                        autorole: roleId,
                    },
                });

                await interaction.editReply(`Es wurde ein Eintrag für ${serverName} mit dem Wert ${roleId} erstellt.`);
            } catch (error) {
                await interaction.editReply("Es ist ein Fehler beim Setzen der AutoRole aufgetreten!");
                console.log(error);
            }

    },
};
