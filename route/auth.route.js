const express = require('express');
const router = express.Router();
const { create , auth , logout , getCurrentUser} = require('../controller/auth.controller')
const {authMiddleware} = require('../middleware/userMiddleware')

router.post('/register', create)
router.post('/login', auth)
router.post('/logout', authMiddleware,logout)
router.get('/me', authMiddleware,getCurrentUser)

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router