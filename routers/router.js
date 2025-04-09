const express = require('express')
const Controller = require('../controllers/controller')
const { isLoggedIn, isAdmin } = require('../helper/middleware')
const router = express.Router()

//Home
router.get('/home', Controller.home)

// Register
router.get('/register', Controller.formRegister)
router.post('/register', Controller.saveRegister)

// Login
router.get('/login', Controller.formLogin)
router.post('/login', Controller.checkLogin)

// Logout
router.get('/logout', Controller.logout)

// User
router.get('/user/:UserId/profile',Controller.profile)
router.get('/user/:UserId/reservation',Controller.reservation)
router.get('/user', Controller.X)


module.exports = router

