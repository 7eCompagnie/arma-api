import express from 'express'
import {deleteImage, getImage, getImages} from "../controllers/images.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";
import {createImageLike, getLikesOfImages, deleteImageLike} from "../controllers/images_likes.controller.js";

const router = express.Router()

// Likes
router.get('/:id/likes', isSigned, getLikesOfImages)
router.post('/:id/likes', isSigned, createImageLike)
router.delete('/:id/likes', isSigned, deleteImageLike)

router.get('/', isSigned, getImages)
router.get('/:id', isSigned, getImage)
router.delete('/:id', isSigned, deleteImage)
router.get('/:id', isSigned, getImages)
router.get('/:id', isSigned, getImage)
router.delete('/:id', isSigned, deleteImage)

export default router