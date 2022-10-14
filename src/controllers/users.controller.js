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

export const createUser = async (req, res) => {
    if (!req.body.discord_identifier ||
        !req.body.discord_username ||
        !req.body.discord_discriminator ||
        !req.body.discord_avatar)
        return res.status(422).json({
            message: "Mandatory fields are missing."
        })

    try {
        if (await usersService.isUserExists(req.body.discord_identifier))
            return res.status(409).json({
                message: `User (${req.body.discord_identifier}) already exists.`
            })

        try {
            const data = getProps(req.body, 'discord_identifier', 'discord_username', 'discord_discriminator', 'discord_avatar')

            return res.status(201).json(await usersService.createUser(data))
        } catch (e) {
            console.error(e)

            return res.status(500).json({
                message: e.message,
            })
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}