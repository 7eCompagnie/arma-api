import express from 'express'
import {createCampaign, deleteCampaign, getCampaign, getCampaigns, updateCampaign} from "../controllers/campaigns.controller.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";

const router = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads/campaigns',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

const uploadCampaigns = multer({storage: storage});

router.get('/', getCampaigns)
router.get('/:id', getCampaign)
router.post('/', uploadCampaigns.single("image"), createCampaign)
router.post('/:id', uploadCampaigns.single("image"), updateCampaign)
router.delete('/:id', deleteCampaign)

export default router