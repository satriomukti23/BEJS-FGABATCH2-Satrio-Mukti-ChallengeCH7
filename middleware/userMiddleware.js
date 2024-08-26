const jwt = require('jsonwebtoken');
const USER = require('../model/user.model');
const prisma = require('../config/prisma');

const authMiddleware = async (req,res,next) => {

    let token;
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     token = req.headers.authorization.split(' ')[1];
    // }
    token = req.cookies.jwt

    if (!token) {
        return res.status(401).json({
            status : 401,
            message: 'Access Denied'
        })
    }

    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log(error)
        return next(res.status(401).json({
            error : error,
            message : 'Invalid Token'
        }))
    }

    const currentUser = await USER.getUserById(decoded.id)
    if (!currentUser) {
        return res.status(401).json({
            status : 401,
            message: 'Access Denied'
        })
    }
    req.user = currentUser;
    next()
}

const permissionUser = (...Role) => {
    return async (req,res,next) => {
        const roleData = await prisma.role.findUnique({
            where : {
                id : req.user.roleId
            }
        })

        const roleName = roleData.name

        if(!Role.includes(roleName)){
            return res.status(401).json({
                status : 401,
                message: 'Access Denied'
            })
        }
        console.log(req.user)
        next()
    }
}

module.exports = {
    authMiddleware,
    permissionUser
}