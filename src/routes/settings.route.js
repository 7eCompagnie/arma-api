import express from 'express'
import {createSetting, deleteSetting, getSetting, getSettings, updateSetting} from "../controllers/settings.controller.js";

const router = express.Router()

router.get('/', getSettings)
router.get('/:name', getSetting)
router.post('/', createSetting)
router.patch('/:name', updateSetting)
router.delete('/:name', deleteSetting)

export default router