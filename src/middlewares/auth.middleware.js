import jwt from "jsonwebtoken";

export const extractBearerToken = (headerValue) => {
    if (typeof headerValue !== 'string')
        return false

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

export const isSigned = (req, res, next) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    if (!token)
        return res.status(401).json({ message: 'You must be signed for this.' })

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err)
            res.status(401).json({ message: 'Invalid token.' })
        else
            return next()
    })
}