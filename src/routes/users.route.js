import express from 'express'
import {getUsers, createUser, getUser} from "../controllers/users.controller.js";
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)

export default router