const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/home', Controller.X)

// Landing Page
router.get('/thread', Controller.X)

// Register
router.get('/register', Controller.formRegister)
router.post('/register', Controller.saveRegister)

// Login
router.get('/login', Controller.formLogin)
router.post('/login', Controller.checkLogin)

// User
router.get('/user/:UserId/profiles', Controller.profile)
router.get('/user', Controller.X)


module.exports = router