import * as teamsService from "../services/teams.service.js"
import {getProps} from "../utils/props.js";
import * as groupsService from "../services/groups.service.js";
import {getGroup} from "../services/groups.service.js";

export const getTeams = async (req, res) => {
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

        return res.status(200).setHeader('X-Total-Count', await teamsService.getCount()).json(await teamsService.getTeams(pagination, filters, sort))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getTeamsOfGroup = async (req, res) => {
    try {
        if (!await groupsService.getGroup(req.params.id))
            return res.status(404).json({
                message: `No group found with id ${req.params.id}.`
            })

        return res.status(200).json(await teamsService.getTeamsOfGroup(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getTeam = async (req, res) => {
    try {
        if (!await teamsService.getTeam(req.params.id))
            return res.status(404).json({
                message: `No team found with id ${req.params.id}.`
            })

        return res.status(200).json(await teamsService.getTeam(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createTeam = async (req, res) => {
    try {
        if (!req.body.name)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        if (!await getGroup(req.params.id))
            return res.status(404).json({
                message: `No group found with id ${req.params.id}.`
            })

        const data = getProps(req.body, 'name')
        data.groupId = req.params.id

        return res.status(201).json(await teamsService.createTeam(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const updateTeam = async (req, res) => {
    try {
        if (!await teamsService.getTeam(req.params.id))
            return res.status(404).json({
                message: `No team found with id ${req.params.id}.`
            })

        const data = getProps(req.body, 'name')

        return res.status(200).json(await teamsService.updateTeam(req.params.id, data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const deleteTeam = async (req, res) => {
    try {
        if (!await teamsService.getTeam(req.params.id))
            return res.status(404).json({
                message: `No team found with id ${req.params.id}.`
            })

        return res.status(200).json(await teamsService.deleteTeam(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}