import prisma from "../config/prisma.js";

export const getSettings = async (pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.setting.findMany({
            where: {
                name: {
                    contains: filters.name
                }
            },
            orderBy: sort
        })
    } else
        return prisma.setting.findMany({
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

export const getSetting = async (name) => (
    await prisma.setting.findUnique({
        where: {
            name: name
        }
    })
)

export const createSetting = async (data) => (
    await prisma.setting.create({
        data: data
    })
)

export const updateSetting = async (name, data) => (
    await prisma.setting.update({
        where: {
            name: name
        },
        data: data
    })
)

export const deleteSetting = async (name) => {
    return prisma.setting.delete({
        where: {
            name: name
        }
    });
}