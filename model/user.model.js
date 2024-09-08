const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')
const transporter = require('../config/nodemailer')
const jwt = require('jsonwebtoken')

const USER = {

    createUser : async (data) => {
        
        try {
            
            const { name, email, password , roleId} = data
            const numPass = data.password.toString()

            const user = await prisma.user.create({
                data: {
                    name : name,
                    email : email,
                    password : bcrypt.hashSync(numPass, 10),
                    roleId : roleId
                }
            })
            return user
        } catch (error) {
            throw new Error(error)
        }
    },

    getUser : async () => {

        try {
            const users = await prisma.user.findMany()
            return users
        } catch (error) {
            throw new Error(error)
        }
    },

    getUserById : async (id) => {

        try {
            const user = await prisma.user.findUnique({
                where : {
                    id : id
                }
            })
            return user
        } catch (error) {
            throw new Error(error)
        }
    },

    forgotPassword : async (body) => {

        const user = await prisma.user.findUnique({
            where : {
                email : body.email
            }
        })

        if(!user) {
            throw new Error('User not found')
        }

        const payload_token = {
            id : user.id,
            email : user.email
        }

        const token = jwt.sign(payload_token, process.env.JWT_SECRET, {
            expiresIn : '1h'
        })

        return await transporter.sendMail({
            from : 'admin@gmail.com',
            to : user.email,
            subject : 'Reset Password',
            text : `Click this link to reset your password : http://localhost:3000/reset-password/${token}`
        })
    },

    resetPassword : async (id, password) => {

        return await prisma.user.update({
            where : {
                id : id
            },
            data : {
                password : bcrypt.hashSync(password, 10)
            }
        })
    }
}

module.exports = USER