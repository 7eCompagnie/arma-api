import prisma from "../config/prisma.js";

export const getCount = async () => {
    return prisma.image.count();
}

export const getImages = async (pagination, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.image.findMany({
            orderBy: sort,
            include: {
                user: true,
                operation: true,
                likes: true
            }
        })
    } else
        return prisma.image.findMany({
            skip: pagination.skip,
            take: pagination.limit,
            orderBy: sort,
            include: {
                user: true,
                operation: true,
                likes: true
            }
        })
}

export const getImagesOfOperation = async (operationId) => {
    return prisma.image.findMany({
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

export const getImage = async (id) => (
    await prisma.image.findUnique({
        where: {
            id: id
        }
    })
)

export const createImage = async (data) => (
    await prisma.image.create({
        data: data
    })
)

export const deleteImage = async (id) => {
    return prisma.image.delete({
        where: {
            id: id
        }
    });
}