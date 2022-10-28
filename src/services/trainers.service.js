import prisma from "../config/prisma.js";

export const getCount = async () => {
    return prisma.trainer.count();
}

export const getTrainers = async (trainingId, pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.trainer.findMany({
            where: {
                user: {
                    discordUsername: {
                        contains: filters.discordUsername
                    }
                },
                training: {
                    id: trainingId
                }
            },
            orderBy: sort
        })
    } else
        return prisma.trainer.findMany({
            skip: pagination.skip,
            take: pagination.limit,
            where: {
                user: {
                    discordUsername: filters.discordUsername
                },
                training: {
                    id: trainingId
                }
            },
            orderBy: sort
        })
}

export const getTrainer = async (trainingId, userId) => (
    await prisma.trainer.findUnique({
        where: {
            userId_trainingId: {
                userId: userId,
                trainingId: trainingId
            }
        }
    })
)

export const createTrainer = async (data) => (
    await prisma.trainer.create({
        data: data
    })
)

export const deleteTrainer = async (trainingId, userId) => {
    return prisma.trainer.delete({
        where: {
            userId_trainingId: {
                userId: userId,
                trainingId: trainingId
            }
        }
    });
}