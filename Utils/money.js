import { registerGameGlobalStatsEntry } from "./globalGameStats.js";

export async function addMoney(prisma, discordId, amount, reason) {
    const user = await prisma.user.upsert({
        where: {
            userid: discordId,
        },
        update: {
            balance: {
                increment: amount,
            },
        },
        create: {
            userid: discordId,
            balance: amount,
        },
    });
    const transaction = await prisma.transaction.create({
        data: {
            type: `add ${reason}`,
            amount,
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    });
    return user.balance;
}

export async function removeMoney(prisma, discordId, amount, reason) {
    const user = await prisma.user.findUnique({
        where: {
            userid: discordId,
        },
    });
    if (!user) {
        throw new Error('User not found');
    }
    if (user.balance < amount) {
        throw new Error('Insufficient balance');
    }
    const updatedUser = await prisma.user.update({
        where: {
            userid: discordId,
        },
        data: {
            balance: user.balance - amount,
        },
    });
    const transaction = await prisma.transaction.create({
        data: {
            type: `remove ${reason}`,
            amount,
            user: {
                connect: {
                    id: updatedUser.id,
                },
            },
        },
    });
    return updatedUser.balance;
}

export async function getMoney(prisma, discordId) {

    const user = await prisma.user.upsert({
        where: {
            userid: discordId,
        },
        update: {},
        create: {
            userid: discordId,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }
    return user.balance;
}

export async function handleGameEnd(interaction, result, gameName, coinsWin, coinsLose) {
    if (!interaction) {
        throw new Error('Interaction not found');
    }
    if (!result) {
        throw new Error('Result not found');
    }
    if (!gameName) {
        throw new Error('User not found');
    }
    if (!coinsWin) {
        throw new Error('CoinsWin not found');
    }
    if (!coinsLose) {
        throw new Error('CoinsLose not found');
    }

    if(!result.winner) { //check if single-player game

        if (result.result === 'win') {
            const coinText = coinsWin === 1 ? 'Coin' : 'Coins';

            await addMoney(interaction.client.prisma, interaction.user.id, coinsWin, `Win ${gameName}`);
            const messageWinnerToDelete = await interaction.followUp({ content: `Du hast ${coinsWin} ${coinText} erhalten! 😎`, ephemeral: true });
            setTimeout(async () => {
                await messageWinnerToDelete.delete().catch((err) => console.log(err));
            }, 10000);
            await registerGameGlobalStatsEntry(interaction, interaction.user.id, gameName, (result.result === 'win'));
            return;
        }

        const userMoney = await getMoney(interaction.client.prisma, interaction.user.id);

        if (userMoney < coinsLose) {
            const messageLoserToDelete = await interaction.followUp({ content: "Du kannst deine Schulden nicht mehr bezahlen! 😰", ephemeral: true });
            setTimeout(async () => {
                await messageLoserToDelete.delete().catch((err) => console.log(err));
            }, 10000);
            await registerGameGlobalStatsEntry(interaction, interaction.user.id, gameName, (result.result === 'win'));
            return;
        }

        await removeMoney(interaction.client.prisma, interaction.user.id, coinsLose, `Lose ${gameName}`);
        const coinText = coinsLose === 1 ? 'Coin' : 'Coins';
        const messageLoserToDelete = await interaction.followUp({ content: `Du hast ${coinsLose} ${coinText} verloren! 👾`, ephemeral: true });
        setTimeout(async () => {
            await messageLoserToDelete.delete().catch((err) => console.log(err));
        }, 10000);
        await registerGameGlobalStatsEntry(interaction, interaction.user.id, gameName, (result.result === 'win'));

    } else {
        let winnerId = result.winner;

        let winner = result.player;
        let loser = result.opponent;

        //Switch roles
        if(winnerId === loser.id) {
            loser = result.player;
            winner = result.opponent;
        }


        const coinText = coinsLose === 1 ? 'Coin' : 'Coins';
        await addMoney(interaction.client.prisma, winner.id, coinsWin, `Win ${gameName}`);
        const messageWinnerToDelete = await interaction.followUp(`${winner.username } hat ${coinsLose} ${coinText} erhalten! 😎`);

        setTimeout(async () => {
            await messageWinnerToDelete.delete().catch((err) => console.log(err));
        }, 10000);

        const userMoney = await getMoney(interaction.client.prisma, loser.id);

        if (userMoney < coinsLose) {
            const messageLoserToDelete = interaction.followUp(`${loser.username} kann seine Schulden nicht mehr bezahlen! 😰`);
            setTimeout(async () => {
                await messageLoserToDelete.delete().catch((err) => console.log(err));
            }, 10000);
            await registerGameGlobalStatsEntry(interaction, interaction.user.id, gameName, (result.result === 'win'));
            return;
        }

        await removeMoney(interaction.client.prisma, loser.id, coinsLose, `Lose ${gameName}`);
        const messageLoserToDelete = await interaction.followUp(`${loser.username} hat ${coinsLose} Coins verloren! 👾`);
        setTimeout(async () => {
            await messageLoserToDelete.delete().catch((err) => console.log(err));
        }, 10000);
        await registerGameGlobalStatsEntry(interaction, interaction.user.id, gameName, (result.result === 'win'));

    }
}