import express from 'express'
import {deleteGroup, getGroup, getGroups, updateGroup} from "../controllers/groups.controller.js";
import {createTeam, getTeamsOfGroup} from "../controllers/teams.controller.js";

const router = express.Router()

router.get('/', getGroups)
router.get('/:id', getGroup)
router.patch('/:id', updateGroup)
router.delete('/:id', deleteGroup)

router.get('/:id/teams/', getTeamsOfGroup)
router.post('/:id/teams/', createTeam)

export default router