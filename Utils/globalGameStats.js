export async function registerGameGlobalStatsEntry(interaction, discordId, gameName, isWin) {
    return await interaction.client.prisma.globalGameStats.create({
        data: {
            userId: discordId,
            gameName: gameName,
            isWin: isWin
        },
    });
}
