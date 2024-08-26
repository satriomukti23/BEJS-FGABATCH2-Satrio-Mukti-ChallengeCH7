const express = require('express')
const router = express.Router()
const {create,getAll,getById,update,deleteOrder} = require('../controller/order.controller')
const {authMiddleware , permissionUser} = require('../middleware/userMiddleware')

router.post('/add', authMiddleware,permissionUser("admin","user"),create)
router.get('/find', authMiddleware,permissionUser("admin"),getAll)
router.get('/findid/:orderId', authMiddleware,permissionUser("admin"), getById)
router.patch('/update/:orderId', authMiddleware,permissionUser("admin","user"),update)
router.delete('/delete/:orderId', authMiddleware,permissionUser("admin","user"),deleteOrder)

module.exports = router