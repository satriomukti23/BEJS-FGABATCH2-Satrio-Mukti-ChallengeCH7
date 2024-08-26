const prisma = require('../config/prisma')
const { update } = require('../controller/order.controller')

const PRODUCT = {

    createProduct : async (data) => {
        try {
            const { orderId , name, description } = data
            const product = await prisma.product.create({
                data: {
                    orderId : orderId,
                    name : name,
                    description : description
                    
                }
            })
            return product
        } catch (error) {
            throw new Error(error)
        }
    },

    getProduct : async () => {
        try {
            const products = await prisma.product.findMany()
            return products
        } catch (error) {
            throw new Error(error)
        }
    },

    getProductById : async (id) => {
        try {
            const product = await prisma.product.findUnique({
                where : {
                    id : id
                }
            })
            return product
        } catch (error) {
            throw new Error(error)
        }
    },

    updateProduct : async (id,data) => {

        try {
            const update = await prisma.product.update({
                where : {
                    id : id
                },
                data : {
                    name : data.name || undefined,
                    description : data.description || undefined
                }
            })
            return update
        } catch (error) {
            throw new Error(error)
        }
    },

    deleteProduct : async (id) => {

        try {
            const deleteProduct = await prisma.product.delete({
                where : {
                    id : id
                }
            })
            return deleteProduct
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = PRODUCT