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

export const isUserExists = async (discord_identifier) => {
    const user = await prisma.user.findUnique({
        where: {
            discord_identifier: discord_identifier
        }
    })

    return user !== null
}

export const createUser = async (data) => (
    await prisma.user.create({
        data: data
    })
)