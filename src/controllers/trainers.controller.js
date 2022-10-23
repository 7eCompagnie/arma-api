import * as trainersService from "../services/trainers.service.js"
import {getProps} from "../utils/props.js";
import {getTraining} from "../services/trainings.service.js";

export const getTrainers = async (req, res) => {
    try {
        if (!await getTraining(req.params.trainingId))
            return res.status(404).json({
                message: `No training found with id ${req.params.trainingId}.`
            })

        let pagination = {
            limit: -1,
            skip: -1
        }
        let sort = []

        if ((!req.query.limit && req.query.skip) ||
            (req.query.limit && !req.query.skip))
            return res.status(422).json({
                message: "Please fill in the two fields \"skip\" and \"limit\"."
            })
        else if (req.query.limit != null && req.query.skip != null) {
            pagination.limit = parseInt(req.query.limit)
            pagination.skip = parseInt(req.query.skip)
        }

        if (req.query.sortBy != null) {
            let obj = {}

            obj[req.query.sortBy] = req.query.orderBy || 'asc'
            sort.push(obj)
        }

        const filters = getProps(req.query, "discordUsername", "trainingName")

        return res.status(200).json(await trainersService.getTrainers(req.params.trainingId, pagination, filters, sort))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getTrainer = async (req, res) => {
    try {
        if (!await getTraining(req.params.trainingId))
            return res.status(404).json({
                message: `No training found with id ${req.params.trainingId}.`
            })

        if (!await trainersService.getTrainer(req.params.trainingId, req.params.userId))
            return res.status(404).json({
                message: `No trainer found for user ${req.params.userId}.`
            })

        return res.status(200).json(await trainersService.getTrainer(req.params.trainingId, req.params.userId))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createTrainer = async (req, res) => {
    try {
        if (!await getTraining(req.params.trainingId))
            return res.status(404).json({
                message: `No training found with id ${req.params.trainingId}.`
            })

        if (!req.body.userId)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        if (await trainersService.getTrainer(req.params.trainingId, req.body.userId))
            return res.status(409).json({
                message: "Trainer already assigned."
            })

        const data = getProps(req.body, 'userId')
        data.trainingId = req.params.trainingId

        return res.status(201).json(await trainersService.createTrainer(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const deleteTrainer = async (req, res) => {
    try {
        if (!await getTraining(req.params.trainingId))
            return res.status(404).json({
                message: `No training found with id ${req.params.trainingId}.`
            })

        if (!await trainersService.getTrainer(req.params.trainingId, req.params.userId))
            return res.status(404).json({
                message: `No trainer found for user ${req.params.userId}.`
            })

        return res.status(200).json(await trainersService.deleteTrainer(req.params.trainingId, req.params.userId))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}