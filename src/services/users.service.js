import prisma from "../config/prisma.js";

export const getUsers = async (limit, skip) => {
    if (limit === -1 && skip === -1)
        return prisma.user.findMany()
    else
        return prisma.user.findMany({
            skip: skip,
            take: limit
        })
}

export const getUserById = async (id) => (
    await prisma.user.findUnique({
        where: {
            id: id
        }
    })
)

export const getUserByDiscordIdentifier = async (discord_identifier) => (
    await prisma.user.findUnique({
        where: {
            discord_identifier: discord_identifier
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

export const updateUserByDiscordIdentifier = async (discord_identifier, data) => (
    await prisma.user.update({
        where: {
            discord_identifier: discord_identifier
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

export const deleteUserByDiscordIdentifier = async (discord_identifier) => (
    await prisma.user.delete({
        where: {
            discord_identifier: discord_identifier
        }
    })
)