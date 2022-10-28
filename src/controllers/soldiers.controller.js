import * as soldiersService from "../services/soldiers.service.js"
import {getProps} from "../utils/props.js";
import * as teamsService from "../services/teams.service.js";
import {getUserById} from "../services/users.service.js";
import {getTraining} from "../services/trainings.service.js";
import {getTeam} from "../services/teams.service.js";
import * as usersService from "../services/users.service.js";

export const getSoldiers = async (req, res) => {
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

        return res.status(200).setHeader('X-Total-Count', await usersService.getCount()).json(await soldiersService.getSoldiers(pagination, filters, sort))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getSoldiersOfTeam = async (req, res) => {
    try {
        if (!await teamsService.getTeam(req.params.id))
            return res.status(404).json({
                message: `No team found with id ${req.params.id}.`
            })

        return res.status(200).json(await soldiersService.getSoldiersOfTeam(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getSoldier = async (req, res) => {
    try {
        if (!await soldiersService.getSoldier(req.params.id))
            return res.status(404).json({
                message: `No soldier found with id ${req.params.id}.`
            })

        return res.status(200).json(await soldiersService.getSoldier(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createSoldier = async (req, res) => {
    try {
        if (!req.body.name ||
            !req.body.trainingId)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        if (!await getTeam(req.params.id))
            return res.status(404).json({
                message: `No team found with id ${req.params.id}.`
            })

        const data = getProps(req.body, 'name', 'trainingId')
        data.teamId = req.params.id

        return res.status(201).json(await soldiersService.createSoldier(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const updateSoldier = async (req, res) => {
    try {
        if (!await soldiersService.getSoldier(req.params.id))
            return res.status(404).json({
                message: `No soldier found with id ${req.params.id}.`
            })

        const data = getProps(req.body, 'name')

        console.log(req.body.userId)
        if (req.body.userId == null && req.body.userId !== undefined)
            data.userId = null
        else if (req.body.userId) {
            if (!await getUserById(req.body.userId))
                return res.status(404).json({
                    message: `No user found with id ${req.body.userId}.`
                })

            data.userId = req.body.userId
        }

        if (req.body.trainingId) {
            if (!await getTraining(req.body.trainingId))
                return res.status(404).json({
                    message: `No training found with id ${req.body.trainingId}.`
                })

            data.trainingId = req.body.trainingId
        }

        return res.status(200).json(await soldiersService.updateSoldier(req.params.id, data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const deleteSoldier = async (req, res) => {
    try {
        if (!await soldiersService.getSoldier(req.params.id))
            return res.status(404).json({
                message: `No soldier found with id ${req.params.id}.`
            })

        return res.status(200).json(await soldiersService.deleteSoldier(req.params.id))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}