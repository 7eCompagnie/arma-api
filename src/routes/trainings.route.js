import express from 'express'
import {getTrainings, createTraining, getTraining, updateTraining, deleteTraining} from "../controllers/trainings.controller.js";
import crypto from "crypto";
import path from "path";
import multer from "multer";
const router = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads/trainings',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

const uploadTrainings = multer({storage: storage});


router.get('/', getTrainings)
router.get('/:id', getTraining)
router.post('/', uploadTrainings.single("image"), createTraining)
router.post('/:id', uploadTrainings.single("image"), updateTraining)
router.delete('/:id', deleteTraining)

export default router