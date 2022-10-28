import prisma from "../config/prisma.js";
import {deleteSoldier, getSoldiersOfTeam} from "./soldiers.service.js";

export const getCount = async () => {
    return prisma.team.count();
}

export const getTeams = async (pagination, filters, sort) => {
    if (pagination.limit === -1 && pagination.skip === -1) {
        return prisma.team.findMany({
            where: {
                name: {
                    contains: filters.name
                }
            },
            orderBy: sort
        })
    } else
        return prisma.team.findMany({
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

export const getTeamsOfGroup = async (groupId) => {
    return prisma.team.findMany({
        where: {
            groupId: groupId
        },
        orderBy: [
            {
                createdAt: 'asc'
            }
        ]
    })
}

export const getTeam = async (id) => (
    await prisma.team.findUnique({
        where: {
            id: id
        }
    })
)

export const createTeam = async (data) => (
    await prisma.team.create({
        data: data
    })
)

export const updateTeam = async (id, data) => (
    await prisma.team.update({
        where: {
            id: id
        },
        data: data
    })
)

export const deleteTeam = async (id) => {
    let soldiers = await getSoldiersOfTeam(id)

    for (let soldier in soldiers)
        await deleteSoldier(soldiers[soldier].id)

    return prisma.team.delete({
        where: {
            id: id
        }
    });
}