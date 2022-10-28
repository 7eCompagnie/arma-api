import * as groupsService from "../services/groups.service.js"
import {getProps} from "../utils/props.js";
import * as operationsService from "../services/operations.service.js";
import {getTeam} from "../services/teams.service.js";
import {getOperation} from "../services/operations.service.js";
import * as usersService from "../services/users.service.js";

export const getGroups = async (req, res) => {
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

        return res.status(200).setHeader('X-Total-Count', await usersService.getCount()).json(await groupsService.getGroups(pagination, filters, sort))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getGroupsOfOperation = async (req, res) => {
    try {
        if (!await operationsService.getOperation(req.params.id))
            return res.status(404).json({
                message: `No operation found with id ${req.params.id}.`
            })

        return res.status(200).json(await groupsService.getGroupsOfOperation(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getGroup = async (req, res) => {
    try {
        if (!await groupsService.getGroup(req.params.id))
            return res.status(404).json({
                message: `No group found with id ${req.params.id}.`
            })

        return res.status(200).json(await groupsService.getGroup(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createGroup = async (req, res) => {
    try {
        if (!req.body.name)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        if (!await getOperation(req.params.id))
            return res.status(404).json({
                message: `No operation found with id ${req.params.id}.`
            })

        const data = getProps(req.body, 'name', 'radio', 'vehicle')
        data.operationId = req.params.id

        return res.status(201).json(await groupsService.createGroup(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const updateGroup = async (req, res) => {
    try {
        if (!await groupsService.getGroup(req.params.id))
            return res.status(404).json({
                message: `No group found with id ${req.params.id}.`
            })

        const data = getProps(req.body, 'name', 'radio', 'vehicle')

        return res.status(200).json(await groupsService.updateGroup(req.params.id, data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const deleteGroup = async (req, res) => {
    try {
        if (!await groupsService.getGroup(req.params.id))
            return res.status(404).json({
                message: `No group found with id ${req.params.id}.`
            })

        return res.status(200).json(await groupsService.deleteGroup(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}