const {
    Amenity,
    Hotel,
    Profile,
    Reservation,
    Room,
    Roomanmenity,
    User
} = require('../models');
const bcrypt = require('bcryptjs');

class Controller {
    //Home
    static async home(req,res){
        try {
            let {userId,userRole} = req.session

            console.log(userId, userRole)

            let nameOfUser = await User.userName(userId)

            let hotel = await Hotel.findAll()
            res.render('home',{hotel, nameOfUser, userRole, userId})
        } catch (error) {
            console.log(error)
        }
    }
    // Register Form
    static async formRegister(req, res) {
        try {
            // Tampilkan error apa saja yang muncul
            let nameOfUser
            let userId

            // ==========
            let { errors } = req.query

            if (errors) {
                errors = errors.split(",")
            }

            // console.log(errors)

            // ==========

            res.render("register", { errors ,nameOfUser, userId})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Ketika menekan tombol register
    static async saveRegister(req, res) {
        try {
            // Menerima Input
            const {username, password, email} = req.body
            
            // Membuat data baru Table Users
            let user = await User.create({
                username:username,
                email:email,
                password:password,
                role : 'user'
            },{
                returning: true
            })
            
            // res.send(user)
            res.redirect(`/login?username=${user.username}&&email=${user.email}`)

        } catch (error) {
            // console.log(error)
            // res.send(error)

            // Masukkan validation disini

            // ============
            console.log(req.body)
            if (error.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                // console.log(error)

                // res.send(error)
                res.redirect(`/register?errors=${error}`)
            } else {
                console.log(error)
                res.send(error)
            }
            // ============
        }
    }

    // Login Form
    static async formLogin(req, res) {
        try {
            // console.log(req.query)
            let nameOfUser
            let userId

            let {username, email} = req.query
            // Cek error 

            // ==========
            let { errors } = req.query

            if (errors) {
                errors = errors.split(",")
            }
            // ==========

            res.render("login", { errors ,username, email, nameOfUser, userId})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Login Check
    static async checkLogin(req, res) {
        try {
            let { username, password } = req.body

            let user = await User.findOne({
                where: {
                    username: username
                }
            })

            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if (isValidPassword) {
                    // Case Berhasil Login

                    // Pemanggillan session => req.session
                    // req.session.userId = user.id // Set session di controller
                    
                    // Hal sensitif tidak boleh ditaruh dalam session
                    // Password tidak boleh ditaruh dalam session
                    req.session.userId = user.id
                    req.session.userRole = user.role

                    // ====================
                    res.redirect(`/home`) // <------------
                    // ====================
                } else {
                    const error = "Invalid username/password"
                    res.redirect(`/login?errors=${error}`)
                }
            } else {
                const error = "Invalid username/password"
                res.redirect(`/login?errors=${error}`)
            }
        } catch (error) {
            console.log(error)
            const errors = "Invalid username/password"
            res.redirect(`login?errors=${errors}`)
        }
    }

    // Profile
    static async profile(req, res) {
        try {
            let nameOfUser
            let userId
            let {UserId} = req.params

            console.log(req.session)

            let userData = await User.findAll({
                include:[{
                    model: Profile
                },{
                    model: Reservation,
                    include:{
                        model:Room,
                        include:{
                            model:Hotel
                        }
                    }
                }],
                where:{
                    id : +UserId
                }
            })

            userData = userData[0]
            let profileData = userData.dataValues.Profile
            let reservationData = userData.dataValues.Reservations

            console.log(reservationData[0].dataValues.Room.dataValues.Hotel)

            // console.log(userData.dataValues)
            // console.log(profileData.dataValues)
            // console.log(reservationData[0].dataValues)

            // res.send(userData)
            res.render("./user/profile", {userData,profileData,reservationData, userId, nameOfUser})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Logout
    static async logout(req, res) {
        try {
            req.session.destroy(function(error){
                if(error){
                    console.log(error)
                } else {
                    res.redirect("/login")
                }
            })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Reservation
    static async reservation(req, res) {
        try {
            res.render("test")
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Basic Schema
    static async X(req, res) {
        try {

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller