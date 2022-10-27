import * as usersService from "../services/users.service.js"
import {getProps} from "../utils/props.js";
import 'dotenv/config'
import axios from "axios";
import {getUserByDiscordIdentifier} from "../services/users.service.js";
import jwt from "jsonwebtoken";
import {extractBearerToken} from "../middlewares/auth.middleware.js";

export const getUsers = async (req, res) => {
    try {
        let pagination = {
            limit: -1,
            skip: -1
        }
        let sort = []

        if ((req.query.limit != null && req.query.skip == null) ||
            (req.query.limit == null && req.query.skip != null))
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

        const filters = getProps(req.query, "discordUsername", "role")

        return res.status(200).json(await usersService.getUsers(pagination, filters, sort))
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
    try {
        if (!req.body.discordIdentifier ||
            !req.body.discordUsername ||
            !req.body.discordDiscriminator ||
            !req.body.discordAvatar)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        if (await usersService.getUserByDiscordIdentifier(req.body.discordIdentifier))
            return res.status(409).json({
                message: `User (${req.body.discordIdentifier}) already exists.`
            })

        const data = getProps(req.body, 'discordIdentifier', 'discordUsername', 'discordDiscriminator', 'discordAvatar')

        return res.status(201).json(await usersService.createUser(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        if (req.query.type === "id") {
            if (!await usersService.getUserById(req.params.id))
                return res.status(404).json({
                    message: `No user found with id ${req.params.id}.`
                })

            const data = getProps(req.body, 'discordUsername', 'discordDiscriminator', 'discordAvatar')

            return res.status(200).json(await usersService.updateUserById(req.params.id, data))
        } else {
            if (!await usersService.getUserByDiscordIdentifier(req.params.id))
                return res.status(404).json({
                    message: `No user found with Discord identifier ${req.params.id}.`
                })

            const data = getProps(req.body, 'discordUsername', 'discordDiscriminator', 'discordAvatar')

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

export const signIn = async (req, res) => {
    if (!req.body.code)
        return res.status(422).json({
            message: "Mandatory fields are missing."
        })

    res.status(200).json({
        token: await getDiscordToken(req.body.code)
    });
}

const getDiscordToken = async (code) => {
    const body = new URLSearchParams();

    body.append('client_id', process.env.DISCORD_CLIENT_ID);
    body.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);

    let token

    await axios.post('https://discordapp.com/api/oauth2/token', body)
        .then(async (response) => {
            const data = {
                token: response.data.access_token,
                refreshToken: response.data.refresh_token,
                tokenType: response.data.token_type,
                expiresIn: response.data.expires_in
            }

            token = await getDiscordUser(data)
        })

    return token
}

const getDiscordUser = async (data) => {
    let token

    await axios.get('https://discordapp.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    })
        .then(async (response) => {
            const discordUser = response.data;
            let user

            if (!await getUserByDiscordIdentifier(discordUser.id)) {
                user = await usersService.createUser({
                    discordIdentifier: discordUser.id,
                    discordUsername: discordUser.username,
                    discordDiscriminator: discordUser.discriminator,
                    discordAvatar: discordUser.avatar
                })
            } else {
                user = await usersService.updateUserByDiscordIdentifier(discordUser.id, {
                    discordIdentifier: discordUser.id,
                    discordUsername: discordUser.username,
                    discordDiscriminator: discordUser.discriminator,
                    discordAvatar: discordUser.avatar
                })
            }

            token = jwt.sign({
                id: user.id,
                discordIdentifier: discordUser.id
            }, process.env.JWT_SECRET, { expiresIn: data.expiresIn });
        })

    return token
}

export const getUserFromToken = async (req, res) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    console.log(decodedToken)
    return res.status(200).json(await usersService.getUserById(decodedToken.id))
}