import * as usersService from "../services/users.service.js"
import {getProps} from "../utils/props.js";

export const getUsers = async (req, res) => {
    let limit = -1
    let skip = -1

    if ((req.query.limit != null && req.query.skip == null) ||
        (req.query.limit == null && req.query.skip != null))
        return res.status(422).json({
            message: "Please fill in the two fields \"skip\" and \"limit\"."
        })
    else if (req.query.limit != null && req.query.skip != null) {
        limit = parseInt(req.query.limit)
        skip = parseInt(req.query.skip)
    }

    try {
        return res.status(200).json(await usersService.getUsers(limit, skip))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        if (req.query.type === "id") {
            if (!await usersService.getUserById(req.params.id))
                return res.status(404).json({
                    message: `No user found with id ${req.params.id}.`
                })

            return res.status(200).json(await usersService.getUserById(req.params.id))
        } else {
            if (!await usersService.getUserByDiscordIdentifier(req.params.id))
                return res.status(404).json({
                    message: `No user found with Discord identifier ${req.params.id}.`
                })

            return res.status(200).json(await usersService.getUserByDiscordIdentifier(req.params.id))
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createUser = async (req, res) => {
    if (!req.body.discord_identifier ||
        !req.body.discord_username ||
        !req.body.discord_discriminator ||
        !req.body.discord_avatar)
        return res.status(422).json({
            message: "Mandatory fields are missing."
        })

    try {
        if (await usersService.getUserByDiscordIdentifier(req.body.discord_identifier))
            return res.status(409).json({
                message: `User (${req.body.discord_identifier}) already exists.`
            })

        const data = getProps(req.body, 'discord_identifier', 'discord_username', 'discord_discriminator', 'discord_avatar')

        return res.status(201).json(await usersService.createUser(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const updateUser = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(422).json({
            message: "Provides at least one value to update a user."
        })

    try {
        if (req.query.type === "id") {
            if (!await usersService.getUserById(req.params.id))
                return res.status(404).json({
                    message: `No user found with id ${req.params.id}.`
                })

            const data = getProps(req.body, 'discord_username', 'discord_discriminator', 'discord_avatar')

            return res.status(200).json(await usersService.updateUserById(req.params.id, data))
        } else {
            if (!await usersService.getUserByDiscordIdentifier(req.params.id))
                return res.status(404).json({
                    message: `No user found with Discord identifier ${req.params.id}.`
                })

            const data = getProps(req.body, 'discord_username', 'discord_discriminator', 'discord_avatar')

            return res.status(200).json(await usersService.updateUserByDiscordIdentifier(req.params.id, data))
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        if (req.query.type === "id") {
            if (!await usersService.getUserById(req.params.id))
                return res.status(404).json({
                    message: `No user found with id ${req.params.id}.`
                })

            return res.status(200).json(await usersService.deleteUserById(req.params.id))
        } else {
            if (!await usersService.getUserByDiscordIdentifier(req.params.id))
                return res.status(404).json({
                    message: `No user found with Discord identifier ${req.params.id}.`
                })

            return res.status(200).json(await usersService.deleteUserByDiscordIdentifier(req.params.id))
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}