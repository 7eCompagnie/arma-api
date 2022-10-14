import * as usersService from "../services/users.service.js"

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
        return await res.status(200).json(usersService.getUsers(limit, skip))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}