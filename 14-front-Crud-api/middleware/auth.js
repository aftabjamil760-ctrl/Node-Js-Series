const jwt = require('jsonwebtoken')
const User = require('../models/users.models')

const auth = async (req, res, next) => {
    try {
    const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined' && bearerHeader) {
            const parts = bearerHeader.split(' ')
            const token = parts.length > 1 ? parts[1] : parts[0]
            const user = jwt.verify(token, process.env.JWT_SECRET)
           
            req.token = user
            next()
        } else {
            res.status(401).json({message: 'No token provided'})
        }
    } catch (err) {
            res.status(403).json({message: 'Invalid or expired token'})         
    }

}
module.exports = auth