import express from 'express'
import {
    createCampaign,
    deleteCampaign,
    getCampaign,
    getCampaigns,
    updateCampaign
} from "../controllers/campaigns.controller.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import {createOperation, getOperationsOfCampaign} from "../controllers/operations.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";

const router = express.Router()

const campaignStorage = multer.diskStorage({
    destination: 'uploads/campaigns',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

const uploadCampaign = multer({storage: campaignStorage});

const operationStorage = multer.diskStorage({
    destination: 'uploads/operations',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

const uploadOperation = multer({storage: operationStorage});

router.get('/', isSigned, getCampaigns)
router.get('/:id', isSigned, getCampaign)
router.post('/', isSigned, uploadCampaign.single("image"), createCampaign)
router.post('/:id', isSigned, uploadCampaign.single("image"), updateCampaign)
router.delete('/:id', isSigned, deleteCampaign)

router.get('/:id/operations/', isSigned, getOperationsOfCampaign)
router.post('/:id/operations', isSigned, uploadOperation.single("image"), createOperation)

export default router