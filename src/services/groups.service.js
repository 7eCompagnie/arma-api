import prisma from "../config/prisma.js";

export const getGroups = async (pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.group.findMany({
            where: {
                name: {
                    contains: filters.name
                }
            },
            orderBy: sort
        })
    } else
        return prisma.group.findMany({
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

export const getGroupsOfOperation = async (operationId) => {
    return prisma.group.findMany({
        where: {
            operationId: operationId
        },
        orderBy: [
            {
                createdAt: 'asc'
            }
        ]
    })
}

export const getGroup = async (id) => (
    await prisma.group.findUnique({
        where: {
            id: id
        }
    })
)

export const createGroup = async (data) => (
    await prisma.group.create({
        data: data
    })
)

export const updateGroup = async (id, data) => (
    await prisma.group.update({
        where: {
            id: id
        },
        data: data
    })
)

export const deleteGroup = async (id) => {
    return prisma.group.delete({
        where: {
            id: id
        }
    });
}