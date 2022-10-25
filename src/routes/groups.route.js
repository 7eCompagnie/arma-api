import express from 'express'
import {deleteGroup, getGroup, updateGroup, getGroups} from "../controllers/groups.controller.js";

const router = express.Router()

router.get('/', getGroups)
router.get('/:id', getGroup)
router.patch('/:id', updateGroup)
router.delete('/:id', deleteGroup)

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