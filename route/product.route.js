const express = require('express')
const router = express.Router();
const {create,getAll,getById,update,deleteProduct} = require('../controller/product.controller')
const {authMiddleware} = require('../middleware/userMiddleware')

router.post('/add', authMiddleware,create)
router.get('/find', authMiddleware,getAll)
router.get('/findid/:productId', authMiddleware,getById)
router.patch('/update/:productId', authMiddleware,update)
router.delete('/delete/:productId', authMiddleware,deleteProduct)

module.exports = router