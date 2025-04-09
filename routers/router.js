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

// User/Edit
router.get('/user/:UserId/profile/edit',Controller.editProfile)
router.post('/user/:UserId/profile/edit',Controller.saveProfile)

router.get('/user/:UserId/roomdetail/:RoomId',Controller.roomDetailAndReserve)
router.post('/user/:UserId/roomdetail/:RoomId',Controller.saveReserve)

// router.get('/user/:UserId/roomdetail/:RoomId/reservation',Controller.reservation)
router.get('/user', Controller.X)


module.exports = router

