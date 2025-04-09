const express = require('express')
const Controller = require('../controllers/controller')
const { isLoggedIn, isAdmin } = require('../helper/middleware')
const router = express.Router()

//Home
router.get('/', Controller.home)

// Register
router.get('/register', Controller.formRegister)
router.post('/register', Controller.saveRegister)

// Login
router.get('/login', Controller.formLogin)
router.post('/login', Controller.checkLogin)

// Logout
router.get('/logout', Controller.logout)

// User
router.get('/user/:UserId/profile',isLoggedIn, isAdmin, Controller.profile)
router.get('/user', Controller.X)


module.exports = router


// Testing
router.get('/home', Controller.home)

// Landing Page
router.get('/test', Controller.test)
