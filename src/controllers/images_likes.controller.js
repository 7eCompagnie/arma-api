import {getImage} from "../services/images.service.js";
import {extractBearerToken} from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";
import * as imagesLikesService from "../services/images_likes.service.js";

export const getLikesOfImages = async (req, res) => {
	try {
		if (!await getImage(req.params.id))
			return res.status(404).json({
				message: `No image found with id ${req.params.id}.`
			})

		return res.status(200).setHeader('X-Total-Count', await imagesLikesService.getCount()).json(await imagesLikesService.getLikesOfImages(req.params.id))
	} catch (e) {
		console.error(e)

		return res.status(500).json({
			message: e.message
		})
	}
}

export const createImageLike = async (req, res) => {
	try {
		if (!await getImage(req.params.id))
			return res.status(404).json({
				message: `No image found with id ${req.params.id}.`
			})

		const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
		let userId = ""

		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			userId = decodedToken.id
		})

		const data = {
			userId: userId,
			imageId: req.params.id
		}

		return res.status(201).json(await imagesLikesService.createImageLike(data))
	} catch (e) {
		console.error(e)

		return res.status(500).json({
			message: e.message
		})
	}
}

export const deleteImageLike = async (req, res) => {
	try {
		if (!await getImage(req.params.id))
			return res.status(404).json({
				message: `No image found with id ${req.params.id}.`
			})

		const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
		let userId = ""

		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			userId = decodedToken.id
		})

		return res.status(201).json(await imagesLikesService.deleteImageLike(req.params.id, userId))
	} catch (e) {
		console.error(e)

		return res.status(500).json({
			message: e.message
		})
	}
}