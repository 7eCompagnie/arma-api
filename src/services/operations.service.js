import prisma from "../config/prisma.js";

export const getOperations = async (campaignId, pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.operation.findMany({
            where: {
                campaignId: campaignId,
                name: {
                    contains: filters.name
                }
            },
            orderBy: sort
        })
    } else
        return prisma.operation.findMany({
            skip: pagination.skip,
            take: pagination.limit,
            where: {
                campaignId: campaignId,
                name: {
                    contains: filters.name
                }
            },
            orderBy: sort
        })
}

export const getOperation = async (id) => (
    await prisma.operation.findUnique({
        where: {
            id: id
        }
    })
)

export const getOperationBySlug = async (slug) => (
    await prisma.operation.findUnique({
        where: {
            slug: slug
        }
    })
)

export const createOperation = async (data) => (
    await prisma.operation.create({
        data: data
    })
)

export const updateOperation = async (id, data) => (
    await prisma.operation.update({
        where: {
            id: id
        },
        data: data
    })
)

export const updateOperationBySlug = async (slug, data) => (
    await prisma.operation.update({
        where: {
            slug: slug
        },
        data: data
    })
)

export const deleteOperation = async (id) => {
    await prisma.group.deleteMany({
        where: {
            operation: {
                id: id
            }
        }
    })

    return prisma.operation.delete({
        where: {
            id: id
        }
    });
}

export const deleteOperationBySlug = async (slug) => {
    await prisma.group.deleteMany({
        where: {
            operation: {
                slug: slug
            }
        }
    })

    return prisma.operation.delete({
        where: {
            slug: slug
        }
    });
}