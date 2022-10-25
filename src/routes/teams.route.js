import express from 'express'
import {deleteTeam, getTeam, updateTeam, getTeams} from "../controllers/teams.controller.js";

const router = express.Router()

router.get('/', getTeams)
router.get('/:id', getTeam)
router.patch('/:id', updateTeam)
router.delete('/:id', deleteTeam)

// TODO: Reworks routes:
/*
* /operations/:operationsId/groups/ [GET]   -> get groups of specific operation
* /operations/:operationsId/groups/ [POST]  -> create group in operation
* /groups/ [GET]                            -> get all groups
* /groups/:id [GET]                         -> get specific group
* /groups/:id [PATCH]                       -> update group
* /groups/:id [DELETE]                      -> delete group
* */

export default router