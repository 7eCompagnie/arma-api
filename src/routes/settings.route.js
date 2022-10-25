import express from 'express'
import {createSetting, deleteSetting, getSetting, getSettings, updateSetting} from "../controllers/settings.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/', isSigned, getSettings)
router.get('/:name', isSigned, getSetting)
router.post('/', isSigned, createSetting)
router.patch('/:name', isSigned, updateSetting)
router.delete('/:name', isSigned, deleteSetting)

export default router