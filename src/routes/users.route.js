import express from 'express'
import {getUsers, createUser, getUser, updateUser, deleteUser, signIn} from "../controllers/users.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";
const router = express.Router()

router.post('/sign-in', signIn)

router.get('/', isSigned, getUsers)
router.get('/:id', isSigned, getUser)
router.post('/', isSigned, createUser)
router.patch('/:id', isSigned, updateUser)
router.delete('/:id', isSigned, deleteUser)

export default router