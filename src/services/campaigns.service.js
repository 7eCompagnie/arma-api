import prisma from "../config/prisma.js";
import {deleteOperation, getOperationsOfCampaign} from "./operations.service.js";
import {deleteFile} from "../utils/files.js";

export const getCount = async () => {
    return prisma.campaign.count();
}

export const getCampaigns = async (pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.campaign.findMany({
            where: {
                name: {
                    contains: filters.name
                }
            },
            orderBy: sort
        })
    } else
        return prisma.campaign.findMany({
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

export const getCampaign = async (id) => (
    await prisma.campaign.findUnique({
        where: {
            id: id
        }
    })
)

export const getCampaignBySlug = async (slug) => (
    await prisma.campaign.findUnique({
        where: {
            slug: slug
        }
    })
)

export const createCampaign = async (data) => (
    await prisma.campaign.create({
        data: data
    })
)

export const updateCampaign = async (id, data) => (
    await prisma.campaign.update({
        where: {
            id: id
        },
        data: data
    })
)

export const deleteCampaign = async (id) => {
    let campaign = await getCampaign(id)

    try {
        deleteFile(campaign.image)
    } catch (e) {
        console.error(e.message)
    }

    let operations = await getOperationsOfCampaign(id)

    for (let operation in operations)
        await deleteOperation(operations[operation].id)

    return prisma.campaign.delete({
        where: {
            id: id
        }
    });
}