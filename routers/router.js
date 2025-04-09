const express = require('express')
const Controller = require('../controllers/controller')
const { isLoggedIn, isAdmin } = require('../helper/middleware')
const router = express.Router()

// Register
router.get('/register', Controller.formRegister)
router.post('/register', Controller.saveRegister)

// Login
router.get('/login', Controller.formLogin)
router.post('/login', Controller.checkLogin)

// Logout
router.get('/logout', Controller.logout)

// Diletakkan setelah login karena mau mengecek session pada saat setelah login dan bukan  pada saat mau login

// Testing Session
// Global Middleware - Dipakai di semua route
// router.use(function(req,res,next){
//     console.log(req.session)
//     console.log('Time:', Date.now(), "Hola")
//     next()
// })

// Untuk mengecek login atau tidak
router.use(function(req,res,next){
    console.log(req.session);
    if(!req.session.userId){
        const error = "Please login first!"
        res.redirect(`/login?errors=${error}`)
    } else {
        next()
    }
})

// // Untuk mengecek role
// router.use(function(req,res,next){
//     // console.log(req.session);
//     if(req.session.userId && !req.session.userRole !== "admin"){
//         const error = "You have no access!"
//         res.redirect(`/login?errors=${error}`)
//     } else {
//         next()
//     }
// })

// Untuk handler disimpan dalam bentuk function jangan route
// Function untuk mengecek logged in atau tidak

// Untuk menambahkan function dalam route (handler / middleware)
// router.get("/path",handler, Controller)


// Testing
router.get('/home', Controller.home)

// Landing Page
router.get('/test', Controller.test)

// User
router.get('/user/:UserId/profiles', Controller.profile)
router.get('/user', Controller.X)


module.exports = router