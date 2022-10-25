import express from 'express'
import {deleteTeam, getTeam, getTeams, updateTeam} from "../controllers/teams.controller.js";
import {createSoldier, getSoldiersOfTeam} from "../controllers/soldiers.controller.js";

const router = express.Router()

router.get('/', getTeams)
router.get('/:id', getTeam)
router.patch('/:id', updateTeam)
router.delete('/:id', deleteTeam)

router.get('/:id/soldiers/', getSoldiersOfTeam)
router.post('/:id/soldiers/', createSoldier)

export default router