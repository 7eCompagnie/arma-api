import express from 'express'
import {deleteTeam, getTeam, getTeams, updateTeam} from "../controllers/teams.controller.js";
import {createSoldier, getSoldiersOfTeam} from "../controllers/soldiers.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/', isSigned, getTeams)
router.get('/:id', isSigned, getTeam)
router.patch('/:id', isSigned, updateTeam)
router.delete('/:id', isSigned, deleteTeam)

router.get('/:id/soldiers/', isSigned, getSoldiersOfTeam)
router.post('/:id/soldiers/', isSigned, createSoldier)

export default router