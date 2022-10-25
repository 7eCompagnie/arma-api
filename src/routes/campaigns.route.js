import express from 'express'
import {createCampaign, deleteCampaign, getCampaign, getCampaigns, updateCampaign} from "../controllers/campaigns.controller.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import {createOperation, getOperationsOfCampaign} from "../controllers/operations.controller.js";

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

router.get('/', getCampaigns)
router.get('/:id', getCampaign)
router.post('/', uploadCampaign.single("image"), createCampaign)
router.post('/:id', uploadCampaign.single("image"), updateCampaign)
router.delete('/:id', deleteCampaign)

router.get('/:id/operations/', getOperationsOfCampaign)
router.post('/:campaignId/operations', uploadOperation.single("image"), createOperation)

export default router