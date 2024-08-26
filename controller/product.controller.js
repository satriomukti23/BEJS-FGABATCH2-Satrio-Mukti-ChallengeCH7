const PRODUCT = require('../model/product.model')

const create = async (req,res) => {

    if(!req.body.orderId ||!req.body.name ||!req.body.description){
        res.status(400).json({ message : 'Please provide all required fields' })
    }

    try {

        const product = await PRODUCT.createProduct({
            orderId : req.body.orderId,
            name : req.body.name,
            description : req.body.description
        })
        return res.status(201).json({ message : 'Product created successfully', data: product })
        
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
}

const getAll = async (req,res) => {

    try {
        const products = await PRODUCT.getProduct()
        return res.status(200).json({ message : 'Products retrieved successfully', data: products })
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
}

const getById = async (req,res) => {

    const {productId} = req.params

    try {
        const product = await PRODUCT.getProductById(productId)
        if(!product){
            return res.status(404).json({ message : 'Product not found' })
        }
        return res.status(200).json({ message : 'Product retrieved successfully', data: product })
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
}

const update = async (req,res) => {

    try {
        const update = await PRODUCT.updateProduct(req.params.productId, req.body)
        if(!update){
            return res.status(404).json({ message : 'Product not found' })
        }
        return res.status(200).json({ message : 'Product updated successfully', data: update })
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }
}

const deleteProduct = async (req,res) => {

    try {
        const deleteProduct = await PRODUCT.deleteProduct(req.params.productId)
        res.status(200).json({ message : 'Product deleted successfully',
            data: deleteProduct
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
    deleteProduct
}