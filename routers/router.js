const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

//Home
router.get('/', Controller.home)

// Register
router.get('/register', Controller.formRegister)
router.post('/register', Controller.saveRegister)

// Login
router.get('/login', Controller.formLogin)
router.post('/login', Controller.checkLogin)

// Landing Page
router.get('/thread', Controller.X)


module.exports = router