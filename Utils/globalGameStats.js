export async function registerGameGlobalStatsEntry(interaction, discordId, gameName, isWin, coinsWin, coinsLose) {
    return await interaction.client.prisma.globalGameStats.create({
        data: {
            userId: discordId,
            gameName: gameName,
            isWin: isWin,
            coinsWin: coinsWin,
            coinsLose: coinsLose
        },
    });
}
