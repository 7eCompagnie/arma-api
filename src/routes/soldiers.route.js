import express from 'express'
import {deleteSoldier, getSoldier, updateSoldier, getSoldiers} from "../controllers/soldiers.controller.js";

const router = express.Router()

router.get('/', getSoldiers)
router.get('/:id', getSoldier)
router.patch('/:id', updateSoldier)
router.delete('/:id', deleteSoldier)

export default router