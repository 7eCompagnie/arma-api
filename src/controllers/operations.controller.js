import * as operationsService from "../services/operations.service.js"
import {getProps} from "../utils/props.js";
import slugify from "slugify";
import {deleteFile} from "../utils/files.js";
import {getCampaign} from "../services/campaigns.service.js";

export const getOperations = async (req, res) => {
    try {
        if (!await getCampaign(req.params.campaignId))
            return res.status(404).json({
                message: `No campaign found with id ${req.params.campaignId}.`
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

        const filters = getProps(req.query, "name")

        return res.status(200).json(await operationsService.getOperations(req.params.campaignId, pagination, filters, sort))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getOperation = async (req, res) => {
    try {
        if (req.query.type === "slug") {
            if (!await operationsService.getOperationBySlug(req.params.operationId))
                return res.status(404).json({
                    message: `No operation found with slug ${req.params.operationId}.`
                })

            return res.status(200).json(await operationsService.getOperationBySlug(req.params.operationId))
        } else {
            if (!await operationsService.getOperation(req.params.operationId))
                return res.status(404).json({
                    message: `No operation found with id ${req.params.operationId}.`
                })

            return res.status(200).json(await operationsService.getOperation(req.params.operationId))
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createOperation = async (req, res) => {
    try {
        if (!req.body.name ||
            !req.body.date ||
            !req.body.summary ||
            !req.file)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        const slug = slugify(req.body.name, {lower: true})

        if (await operationsService.getOperationBySlug(slug))
            return res.status(409).json({
                message: `Operation ${req.body.name} already exists.`
            })

        const data = getProps(req.body, 'name', 'summary')
        data.image = req.file.path
        data.slug = slug
        data.date = new Date(req.body.date)
        data.campaignId = req.params.campaignId

        return res.status(201).json(await operationsService.createOperation(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const updateOperation = async (req, res) => {
    try {
        let operation = {}

        if (req.query.type === "slug") {
            operation = await operationsService.getOperationBySlug(req.params.operationId)

            if (!operation)
                return res.status(404).json({
                    message: `No operation found with slug ${req.params.operationId}.`
                })

            const data = getProps(req.body, 'name', 'summary')

            if (req.body.name != null) {
                const slug = slugify(req.body.name, {lower: true})

                if (await operationsService.getOperationBySlug(slug))
                    return res.status(409).json({
                        message: `Operation ${req.body.name} already exists.`
                    })

                data.slug = slug
            }

            if (req.file != null) {
                deleteFile(operation.image)
                data.image = req.file.path
            }

            if (req.body.date != null)
                data.date = new Date(req.body.date)

            return res.status(200).json(await operationsService.updateOperationBySlug(req.params.operationId, data))
        } else {
            operation = await operationsService.getOperation(req.params.operationId)
            if (!operation)
                return res.status(404).json({
                    message: `No operation found with id ${req.params.operationId}.`
                })

            operation = await operationsService.getOperation(req.params.operationId)

            const data = getProps(req.body, 'name', 'summary')

            if (req.body.name != null) {
                const slug = slugify(req.body.name, {lower: true})

                if (await operationsService.getOperationBySlug(slug))
                    return res.status(409).json({
                        message: `Operation ${req.body.name} already exists.`
                    })

                data.slug = slug
            }

            if (req.file != null) {
                deleteFile(operation.image)
                data.image = req.file.path
            }

            return res.status(200).json(await operationsService.updateOperation(req.params.operationId, data))
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const deleteOperation = async (req, res) => {
    try {
        if (req.query.type === "slug") {
            if (!await operationsService.getOperationBySlug(req.params.operationId))
                return res.status(404).json({
                    message: `No operation found with slug ${req.params.operationId}.`
                })

            return res.status(200).json(await operationsService.deleteOperationBySlug(req.params.operationId))
        } else {
            if (!await operationsService.getOperation(req.params.operationId))
                return res.status(404).json({
                    message: `No operation found with id ${req.params.operationId}.`
                })

            return res.status(200).json(await operationsService.deleteOperation(req.params.operationId))
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}