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
            let hotel = await Hotel.findAll()
            res.render('home',{hotel})
        } catch (error) {
            console.log(error)
        }
    }
    // Register Form
    static async formRegister(req, res) {
        try {
            // Tampilkan error apa saja yang muncul

            // ==========
            let { errors } = req.query

            if (errors) {
                errors = errors.split(",")
            }

            // console.log(errors)

            // ==========

            res.render("register", { errors })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Ketika menekan tombol register
    static async saveRegister(req, res) {
        try {
            // Menerima Input
            const { username, password, email} = req.body
            
            // Membuat data baru Table Users
            await User.create({
                username:username,
                email:email,
                password:password,
                role : 'user'
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
            let {username, email} = req.query
            // Cek error 

            // ==========
            let { errors } = req.query

            if (errors) {
                errors = errors.split(",")
            }
            // ==========

            res.render("login", { errors ,username, email})
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
            let {UserId} = req.params

            let profile = await User.findAll({
                include:[{
                    model: Profile
                },{
                    model: Reservation
                }],
                where:{
                    id : +UserId
                }
            })

            profile = profile[0]

            console.log(profile.dataValues)
            console.log(profile.dataValues.Profiles[0].dataValues)
            console.log(profile.dataValues.Reservations[0].dataValues)

            // res.send(profile)
            res.render("./user/profile", {profile})
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

    // Test
    static async test(req, res) {
        try {
            res.render("test")
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Basic Schema
    static async home(req, res) {
        try {
            res.send("123")
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