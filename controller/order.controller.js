const ORDER = require('../model/order.model')

const create = async (req,res) => {

    if(!req.body.userId|| !req.body.name || !req.body.date){
        return res.status(400).json({
            message: 'Please fill all the fields'
        })
    }

    try {
        const order = await ORDER.createOrder({
            userId : req.body.userId,
            name: req.body.name,
            date: req.body.date,
        })
        return res.status(201).json({
            message: 'Order created successfully',
            data: order
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Validasi Error'
        })
    }
}

const getAll = async (req,res) => {

    try {
        const orders = await ORDER.getOrder()
        return res.status(200).json({
            message: 'Get all orders successfully',
            data: orders
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Validasi Error'
        })
    }
}

const getById = async (req,res) => {

    const { orderId } = req.params

    try {
        const order = await ORDER.getOrderById(orderId)
        if(!order){
            return res.status(404).json({
                message: 'Order not found'
            })
        }
        return res.status(200).json({
            message: 'Get order by id successfully',
            data: order
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Validasi Error'
        })
    }
}

const update =  async (req, res) => {
    try {
        const updatedOrder = await ORDER.updateOrder(req.params.orderId, req.body);
        res.status(200).json({
            message: 'Order updated successfully',
            data: updatedOrder
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Validasi Error' });
    }
}

const deleteOrder = async (req,res) => {

    try {
        const deleteOrder = await ORDER.deleteOrder(req.params.orderId)
        res.status(200).json({
            message: 'Order Deleted',
            data: deleteOrder
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Validasi Error'
        })   
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteOrder
}