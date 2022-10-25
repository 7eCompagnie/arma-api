import express from 'express'
import {createTrainer, deleteTrainer, getTrainer, getTrainers} from "../controllers/trainers.controller.js";
import {isSigned} from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/:trainingId/trainers', isSigned, getTrainers)
router.get('/:trainingId/trainers/:userId', isSigned, getTrainer)
router.post('/:trainingId/trainers', isSigned, createTrainer)
router.delete('/:trainingId/trainers/:userId', isSigned, deleteTrainer)

export default router