const prisma = require('../config/prisma')
const upload = require('../utils/fileUpload')

const ORDER = {
    createOrder : async (data) => {

        try {
            const { userId, name, date } = data
         
            const order = await prisma.order.create({
                data: {
                    userId : userId,
                    name: name,
                    date: date,
                }
            })
            return order
        } catch (error) {
            throw new Error(error)
        }
    },

    getOrder : async () => {
        try {
            const orders = await prisma.order.findMany()
            return orders
        } catch (error) {
            throw new Error(error)
        }
    },

    getOrderById : async (id) => {
        try {
            const order = await prisma.order.findUnique({
                where : {
                    id : id
                }
            })
            return order
        } catch (error) {
            throw new Error(error)
        }
    },

    updateOrder: async (id, data) => {
        try {
            const updatedOrder = await prisma.order.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name || undefined,
                    date: data.date || undefined
                }
            })
            return updatedOrder
        } catch (error) {
            throw new Error(error)
        }
    },

    deleteOrder: async(id) => {

        try {
            const deleteOrder = await prisma.order.delete({
                where: {
                    id: id
                }
            })
            return deleteOrder
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = ORDER