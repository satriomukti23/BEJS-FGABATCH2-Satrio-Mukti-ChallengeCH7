const express = require('express');
const router = express.Router();
const { create , auth , logout , getCurrentUser , forgot , reset} = require('../controller/auth.controller')
const {authMiddleware} = require('../middleware/userMiddleware')

router.post('/register', create)
router.post('/login', auth)
router.post('/logout', authMiddleware,logout)
router.get('/me', authMiddleware,getCurrentUser)
router.post('/forgot-password', forgot)
router.post('/reset-password/:token', reset)

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router