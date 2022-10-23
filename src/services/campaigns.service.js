import prisma from "../config/prisma.js";

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

export const updateCampaignBySlug = async (slug, data) => (
    await prisma.campaign.update({
        where: {
            slug: slug
        },
        data: data
    })
)

export const deleteCampaign = async (id) => {
    // TODO: Delete operations

    return prisma.campaign.delete({
        where: {
            id: id
        }
    });
}

export const deleteCampaignBySlug = async (slug) => {
    // TODO: Delete operations

    return prisma.campaign.delete({
        where: {
            slug: slug
        }
    });
}