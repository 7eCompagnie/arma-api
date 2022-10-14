import prisma from "../config/prisma.js";

export const getUsers = async (limit, skip) => {
    if (limit === -1 && skip === -1)
        return prisma.user.findMany()
    else
        return prisma.user.findMany({
            skip: skip,
            take: limit
        });
}