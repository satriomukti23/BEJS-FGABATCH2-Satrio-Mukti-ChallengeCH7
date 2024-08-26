const express = require('express')
const router = express.Router()
const {create,getAll,getById,update,deleteCategories} = require('../controller/categories.controller')
const {authMiddleware} = require('../middleware/userMiddleware')

router.post('/add', authMiddleware,create)
router.get('/find', authMiddleware,getAll)
router.get('/findid/:categoriesId', authMiddleware,getById)
router.patch('/update/:categoriesId', authMiddleware,update)
router.delete('/delete/:categoriesId', authMiddleware,deleteCategories)

module.exports = router