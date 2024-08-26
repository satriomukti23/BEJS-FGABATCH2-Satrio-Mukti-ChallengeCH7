const prisma = require('../config/prisma')

const CATEGORIES = {

    createCategories : async (data) => {
        try {
            const { productId , name , description } = data
            const categories = await prisma.categories.create({
                data: {
                    productId : productId,
                    name : name,
                    description : description

                }
            })
            return categories
        } catch (error) {
            throw new Error(error)
        }
    },
    
    getCategories : async () => {
        try {
            const categories = await prisma.categories.findMany()
            return categories
        } catch (error) {
            throw new Error(error)
        }
    },

    getCategoriesById : async (id) => {
        try {
            const categories = await prisma.categories.findUnique({
                where : {
                    id : id
                }
            })
            return categories
        } catch (error) {
            throw new Error(error)
        }
    },

    updateCategories : async (id,data) => {

        try {
            const update = await prisma.categories.update({
                where : {
                    id : id
                },
                data : {
                    name : data.name || undefined,
                    description : data.description || undefined
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },

    deleteCategories : async (id) => {

        try {
            const deleteCategories = await prisma.categories.delete({
                where : {
                    id : id
                }
            })
            return deleteCategories
        } catch (error) {
            throw new Error(error)
        }
    }


}

module.exports = CATEGORIES