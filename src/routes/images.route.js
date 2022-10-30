import express from 'express'
import {deleteImage, getImage, getImages} from "../controllers/images.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/', isSigned, getImages)
router.get('/:id', isSigned, getImage)
router.delete('/:id', isSigned, deleteImage)

export default router