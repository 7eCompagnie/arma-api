import * as imagesService from "../services/images.service.js"
import {getProps} from "../utils/props.js";
import * as operationsService from "../services/operations.service.js";
import {getUserById} from "../services/users.service.js";
import {getTraining} from "../services/trainings.service.js";
import {getOperation} from "../services/operations.service.js";
import * as usersService from "../services/users.service.js";

export const getImages = async (req, res) => {
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

        return res.status(200).setHeader('X-Total-Count', await usersService.getCount()).json(await imagesService.getImages(pagination, sort))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getImagesOfOperation = async (req, res) => {
    try {
        if (!await operationsService.getOperation(req.params.id))
            return res.status(404).json({
                message: `No operation found with id ${req.params.id}.`
            })

        return res.status(200).json(await imagesService.getImagesOfOperation(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getImage = async (req, res) => {
    try {
        if (!await imagesService.getImage(req.params.id))
            return res.status(404).json({
                message: `No image found with id ${req.params.id}.`
            })

        return res.status(200).json(await imagesService.getImage(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createImage = async (req, res) => {
    try {
        if (!req.body.userId ||
            !req.file)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        if (!await getOperation(req.params.id))
            return res.status(404).json({
                message: `No operation found with id ${req.params.id}.`
            })

        const data = getProps(req.body, 'userId', 'title', 'description')
        data.operationId = req.params.id
        data.image = req.file.path
        data.showOnHome = req.body.showOnHome === 'true'

        return res.status(201).json(await imagesService.createImage(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const deleteImage = async (req, res) => {
    try {
        if (!await imagesService.getImage(req.params.id))
            return res.status(404).json({
                message: `No image found with id ${req.params.id}.`
            })

        return res.status(200).json(await imagesService.deleteImage(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}