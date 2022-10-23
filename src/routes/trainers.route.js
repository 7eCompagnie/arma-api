import express from 'express'
import {createTrainer, deleteTrainer, getTrainer, getTrainers} from "../controllers/trainers.controller.js";

const router = express.Router()

router.get('/:trainingId/trainers', getTrainers)
router.get('/:trainingId/trainers/:userId', getTrainer)
router.post('/:trainingId/trainers', createTrainer)
router.delete('/:trainingId/trainers/:userId', deleteTrainer)

export default router