const express = require('express')
const Controller = require('../controllers/controller')
const { isLoggedIn, isAdmin } = require('../helper/middleware')
const router = express.Router()

const multer = require('multer');
const upload = multer({ dest: './assets/uploads/' })


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

// User/Edit
router.get('/user/:UserId/profile/edit',isLoggedIn,Controller.editProfile)
router.post('/user/:UserId/profile/edit',isLoggedIn,Controller.saveProfile)

router.get('/user/:UserId/roomdetail/:RoomId',isLoggedIn,Controller.roomDetailAndReserve)
router.post('/user/:UserId/roomdetail/:RoomId',isLoggedIn,Controller.saveReserve)

// router.get('/user/:UserId/roomdetail/:RoomId/reservation',Controller.reservation)
router.get('/test', Controller.test)
router.post('/test', upload.single('avatar'),Controller.testSave)
router.get('/user', Controller.X)


module.exports = router

