import express from 'express'
import {createTrainer, deleteTrainer, getTrainer, getTrainers} from "../controllers/trainers.controller.js";

const router = express.Router()

router.get('/trainings/:trainingId/trainers', getTrainers)
router.get('/trainings/:trainingId/trainers/:userId', getTrainer)
router.post('/trainings/:trainingId/trainers', createTrainer)
router.delete('/trainings/:trainingId/trainers/:userId', deleteTrainer)

export default router