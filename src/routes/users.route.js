import express from 'express'
import {getUsers, createUser, getUser, updateUser, deleteUser, signIn} from "../controllers/users.controller.js";
const router = express.Router()

router.post('/sign-in', signIn)

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router