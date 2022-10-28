import prisma from "../config/prisma.js";

export const getCount = async () => {
    return prisma.user.count();
}

export const getUsers = async (pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.user.findMany({
            where: {
                discordUsername: {
                    contains: filters.discordUsername
                },
                role: {
                    equals: filters.role
                }
            },
            orderBy: sort
        })
    } else
        return prisma.user.findMany({
            skip: pagination.skip,
            take: pagination.limit,
            where: {
                discordUsername: {
                    contains: filters.discordUsername
                },
                role: {
                    equals: filters.role
                },
            },
            orderBy: sort
        })
}

export const getUserById = async (id) => (
    await prisma.user.findUnique({
        where: {
            id: id
        }
    })
)

export const getUserByDiscordIdentifier = async (discordIdentifier) => (
    await prisma.user.findUnique({
        where: {
            discordIdentifier: discordIdentifier
        }
    })
)

export const createUser = async (data) => (
    await prisma.user.create({
        data: data
    })
)

export const updateUserById = async (id, data) => (
    await prisma.user.update({
        where: {
            id: id
        },
        data: data
    })
)

export const updateUserByDiscordIdentifier = async (discordIdentifier, data) => (
    await prisma.user.update({
        where: {
            discordIdentifier: discordIdentifier
        },
        data: data
    })
)

export const deleteUserById = async (id) => (
    await prisma.user.delete({
        where: {
            id: id
        }
    })
)

export const deleteUserByDiscordIdentifier = async (discordIdentifier) => (
    await prisma.user.delete({
        where: {
            discordIdentifier: discordIdentifier
        }
    })
)