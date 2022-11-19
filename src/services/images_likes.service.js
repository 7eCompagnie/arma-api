import prisma from "../config/prisma.js";

export const getCount = async () => {
	return prisma.imageLike.count();
}

export const getLikesOfImages = async (id) => {
	return prisma.imageLike.findMany({
		where: {
			imageId: id
		}
	})
}

export const createImageLike = async (data) => (
	await prisma.imageLike.create({
		data: data
	})
)

export const deleteImageLike = async (imageId, userId) => (
	await prisma.imageLike.deleteMany({
		where: {
			imageId: imageId,
			userId: userId
		}
	})
)