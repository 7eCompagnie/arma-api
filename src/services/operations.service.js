import prisma from "../config/prisma.js";
import {deleteGroup, getGroupsOfOperation} from "./groups.service.js";

export const getCount = async () => {
    return prisma.operation.count();
}

export const getOperations = async (pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.operation.findMany({
            where: {
                name: {
                    contains: filters.name
                },
            },
            orderBy: sort
        })
    } else
        return prisma.operation.findMany({
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

export const getOperationsOfCampaign = async (id) => {
    return prisma.operation.findMany({
        where: {
            campaignId: id,
        }
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

export const deleteOperation = async (id) => {
    let groups = await getGroupsOfOperation(id)

    for (let group in groups)
        await deleteGroup(groups[group].id)

    return prisma.operation.delete({
        where: {
            id: id
        }
    });
}