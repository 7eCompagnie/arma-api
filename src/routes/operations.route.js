import express from 'express'
import {createOperation, deleteOperation, getOperation, getOperations, updateOperation} from "../controllers/operations.controller.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";

const router = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads/operations',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

const uploadOperation = multer({storage: storage});

router.get('/:campaignId/operations', getOperations)
router.get('/:campaignId/operations/:operationId', getOperation)
router.post('/:campaignId/operations', uploadOperation.single("image"), createOperation)
router.post('/:campaignId/operations/:operationId', uploadOperation.single("image"), updateOperation)
router.delete('/:campaignId/operations/:operationId', deleteOperation)

export default router