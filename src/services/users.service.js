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