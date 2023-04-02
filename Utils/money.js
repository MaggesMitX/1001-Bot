
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