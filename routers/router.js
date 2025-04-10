const express = require('express')
const Controller = require('../controllers/controller')
const { isLoggedIn, isAdmin } = require('../helper/middleware')
const router = express.Router()
const upload = require('../middlewares/upload')

//Home
router.get('/home',isLoggedIn, Controller.home)

// Register
router.get('/register', Controller.formRegister)
router.post('/register', Controller.saveRegister)

// Login
router.get('/login', Controller.formLogin)
router.post('/login', Controller.checkLogin)

// Logout
router.get('/logout', Controller.logout)

// User
router.get('/user/:UserId/profile',isLoggedIn,Controller.profile)
router.get('/user/:UserId/profile/:ReserveId/delete',isLoggedIn,Controller.deleteReservation)

// User/Edit
router.get('/user/:UserId/profile/edit',isLoggedIn,Controller.editProfile)
router.post('/user/:UserId/profile/edit',isLoggedIn,upload.single('profile_pic'),Controller.saveProfile)

router.get('/user/:UserId/roomdetail/:RoomId',isLoggedIn,Controller.roomDetailAndReserve)
router.post('/user/:UserId/roomdetail/:RoomId',isLoggedIn,Controller.saveReserve)

//Hotel id
// router.get()

// router.get('/user/:UserId/roomdetail/:RoomId/reservation',Controller.reservation)
router.get('/user', Controller.X)


module.exports = router

