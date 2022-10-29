import prisma from "../config/prisma.js";

export const getCount = async () => {
    return prisma.training.count();
}

export const getTrainings = async (pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.training.findMany({
            where: {
                name: {
                    contains: filters.name
                },
                visible: {
                    equals: filters.visible
                },
                trainers: filters.user
            },
            orderBy: sort,
            include: {
                trainers: true
            }
        })
    } else
        return prisma.training.findMany({
            skip: pagination.skip,
            take: pagination.limit,
            where: {
                name: {
                    contains: filters.name
                },
                visible: {
                    equals: filters.visible
                },
                trainers: filters.user
            },
            orderBy: sort,
            include: {
                trainers: true
            }
        })
}

export const getTraining = async (id) => (
    await prisma.training.findUnique({
        where: {
            id: id
        }
    })
)

export const createTraining = async (data) => (
    await prisma.training.create({
        data: data
    })
)

export const updateTraining = async (id, data) => (
    await prisma.training.update({
        where: {
            id: id
        },
        data: data
    })
)

export const deleteTraining = async (id) => {
    await prisma.trainer.deleteMany({
        where: {
            training: {
                id: id
            }
        }
    })

    return prisma.training.delete({
        where: {
            id: id
        }
    });
}