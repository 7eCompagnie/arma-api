import express from 'express'
import {deleteGroup, getGroup, getGroups, updateGroup} from "../controllers/groups.controller.js";
import {createTeam, getTeamsOfGroup} from "../controllers/teams.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/', isSigned, getGroups)
router.get('/:id', isSigned, getGroup)
router.patch('/:id', isSigned, updateGroup)
router.delete('/:id', isSigned, deleteGroup)

router.get('/:id/teams/', isSigned, getTeamsOfGroup)
router.post('/:id/teams/', isSigned, createTeam)

export default router