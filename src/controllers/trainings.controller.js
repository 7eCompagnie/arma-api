import * as trainingsService from "../services/trainings.service.js"
import {getProps} from "../utils/props.js";
import {deleteFile} from "../utils/files.js";

export const getTrainings = async (req, res) => {
    try {
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

        const filters = getProps(req.query, "name", "visible")
        if (req.query.trainerUsername != null)
            filters.user = {
                some: {
                    user: {
                        discordUsername: {
                            contains: req.query.trainerUsername
                        }
                    }
                }
            }

        return res.status(200).setHeader('X-Total-Count', await trainingsService.getCount()).json(await trainingsService.getTrainings(pagination, filters, sort))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getTraining = async (req, res) => {
    try {
        if (!await trainingsService.getTraining(req.params.id))
            return res.status(404).json({
                message: `No training found with id ${req.params.id}.`
            })

        return res.status(200).json(await trainingsService.getTraining(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createTraining = async (req, res) => {
    try {
        if (!req.body.name ||
            !req.body.description ||
            !req.file)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        const data = getProps(req.body, 'name', 'description')
        data.image = req.file.path
        if (req.body.visible)
            data.visible = req.body.visible !== 'false' && parseInt(req.body.visible) !== 0

        return res.status(201).json(await trainingsService.createTraining(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const updateTraining = async (req, res) => {
    try {
        const training = await trainingsService.getTraining(req.params.id)

        if (!training)
            return res.status(404).json({
                message: `No training found with id ${req.params.id}.`
            })

        const data = getProps(req.body, 'name', 'description')

        if (data.name === "" || data.description === "")
            return res.status(404).json({
                message: `"name" or "description" cannot be empty.`
            })

        if (req.file != null) {
            deleteFile(training.image)
            data.image = req.file.path
        }

        if (req.body.visible)
            data.visible = req.body.visible !== 'false' && parseInt(req.body.visible) !== 0

        return res.status(200).json(await trainingsService.updateTraining(req.params.id, data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const deleteTraining = async (req, res) => {
    try {
        if (!await trainingsService.getTraining(req.params.id))
            return res.status(404).json({
                message: `No training found with id ${req.params.id}.`
            })

        return res.status(200).json(await trainingsService.deleteTraining(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}