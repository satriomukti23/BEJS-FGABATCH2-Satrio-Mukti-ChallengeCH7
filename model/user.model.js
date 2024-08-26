const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')
const { get } = require('../route/auth.route')

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
    }

}

module.exports = USER