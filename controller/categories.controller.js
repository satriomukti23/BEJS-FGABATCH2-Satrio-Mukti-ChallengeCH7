const CATEGORIES = require('../model/categories.model')

const create = async (req,res) => {

    if(!req.body.productId ||!req.body.name ||!req.body.description){
        res.status(400).json({ message : 'Please provide all required fields' })
    }

    try {
        const category = await CATEGORIES.createCategories({
            productId : req.body.productId,
            name : req.body.name,
            description : req.body.description
        })
        return res.status(201).json({ message : 'Category created successfully', data: category })
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
}

const getAll = async (req,res) => {

    try {
        const categories = await CATEGORIES.getCategories()
        return res.status(200).json({ message : 'Categories retrieved successfully', data: categories })
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
}

const getById = async (req,res) => {

    const {categoriesId} = req.params

    try {
        const category = await CATEGORIES.getCategoriesById(categoriesId)
        if(!category){
            return res.status(404).json({ message : 'Category not found' })
        }
        return res.status(200).json({ message : 'Category retrieved successfully', data: category })
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
}

const update = async (req,res) => {

    try {
        const updateCategory = await CATEGORIES.updateCategories(req.params.categoriesId, req.body)
        res.status(200).json({ 
            message : 'Category updated successfully',
            data: updateCategory 
        })
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
}

const deleteCategories = async (req,res) => {

    try {
        const deleteCategory = await CATEGORIES.deleteCategories(req.params.categoriesId)
        res.status(200).json({
            message : 'Category deleted successfully',
            data: deleteCategory
        })
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteCategories
}