import express from 'express'
import {deleteSoldier, getSoldier, updateSoldier, getSoldiers} from "../controllers/soldiers.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/', isSigned, getSoldiers)
router.get('/:id', isSigned, getSoldier)
router.patch('/:id', isSigned, updateSoldier)
router.delete('/:id', isSigned, deleteSoldier)

export default router