import * as settingsService from "../services/settings.service.js"
import {getProps} from "../utils/props.js";
import * as usersService from "../services/users.service.js";

export const getSettings = async (req, res) => {
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

        const filters = getProps(req.query, "name")

        return res.status(200).setHeader('X-Total-Count', await usersService.getCount()).json(await settingsService.getSettings(pagination, filters, sort))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getSetting = async (req, res) => {
    try {
        if (!await settingsService.getSetting(req.params.name))
            return res.status(404).json({
                message: `No setting found with id ${req.params.name}.`
            })

        return res.status(200).json(await settingsService.getSetting(req.params.name))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createSetting = async (req, res) => {
    try {
        if (!req.body.name ||
            !req.body.value)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        if (await settingsService.getSetting(req.body.name))
            return res.status(409).json({
                message: `Setting ${req.body.name} already exists.`
            })

        const data = getProps(req.body, 'name', 'value')

        return res.status(201).json(await settingsService.createSetting(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const updateSetting = async (req, res) => {
    try {
        if (!await settingsService.getSetting(req.params.name))
            return res.status(404).json({
                message: `No setting found with id ${req.params.name}.`
            })

        const data = getProps(req.body, 'value')

        return res.status(200).json(await settingsService.updateSetting(req.params.name, data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const deleteSetting = async (req, res) => {
    try {
        if (!await settingsService.getSetting(req.params.name))
            return res.status(404).json({
                message: `No setting found with id ${req.params.name}.`
            })

        return res.status(200).json(await settingsService.deleteSetting(req.params.name))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}