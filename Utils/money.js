
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

    if (result.result === 'win') {
        await addMoney(interaction.client.prisma, interaction.user.id, coinsWin, `Win ${gameName}`);
        await interaction.followUp({ content: `Du hast ${coinsWin} Coins erhalten 😎`, ephemeral: true });
        return;
    }

    const userMoney = await getMoney(interaction.client.prisma, interaction.user.id);

    if (userMoney < coinsLose) {
        await interaction.followUp({ content: "Du kannst deine Schulden nicht mehr bezahlen! 😰", ephemeral: true });
        return;
    }

    await removeMoney(interaction.client.prisma, interaction.user.id, coinsLose, `Lose ${gameName}`);
    await interaction.followUp({ content: `Du hast ${coinsLose} Coins verloren! 👾`, ephemeral: true });

}