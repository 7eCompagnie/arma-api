import prisma from "../config/prisma.js";

export const getSoldiers = async (pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.soldier.findMany({
            where: {
                name: {
                    contains: filters.name
                }
            },
            orderBy: sort
        })
    } else
        return prisma.soldier.findMany({
            skip: pagination.skip,
            take: pagination.limit,
            where: {
                name: {
                    contains: filters.name
                }
            },
            orderBy: sort
        })
}

export const getSoldiersOfTeam = async (teamId) => {
    return prisma.soldier.findMany({
        where: {
            teamId: teamId
        },
        orderBy: [
            {
                createdAt: 'asc'
            }
        ]
    })
}

export const getSoldier = async (id) => (
    await prisma.soldier.findUnique({
        where: {
            id: id
        }
    })
)

export const createSoldier = async (data) => (
    await prisma.soldier.create({
        data: data
    })
)

export const updateSoldier = async (id, data) => (
    await prisma.soldier.update({
        where: {
            id: id
        },
        data: data
    })
)

export const deleteSoldier = async (id) => {
    return prisma.soldier.delete({
        where: {
            id: id
        }
    });
}