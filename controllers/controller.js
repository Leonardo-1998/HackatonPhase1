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
const user = require('../models/user');

class Controller {
    // Register Form
    static async formRegister(req, res) {
        try {
            // Tampilkan error apa saja yang muncul

            // ==========
            let {errors} = req.query

            if(errors){
                errors = errors.split(",")
            }

            console.log(errors)

            // ==========

            res.render("register", {errors})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Ketika menekan tombol register
    static async saveRegister(req, res) {
        try {
            // Menerima Input
            const { username,email, password, role } = req.body
            
            // Membuat data baru Table Users
            await User.create({
                username:username,
                email:email,
                password:password,
                role:role
            })
            
            // res.send("123")
            console.log(req.body + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            res.redirect("/login")
        } catch (error) {
            // console.log(error)
            // res.send(error)

            // Masukkan validation disini
            
            // ============
            if (error.name === "SequelizeValidationError") {
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
            // Cek error 

            // ==========
            // let {errors} = req.query

            // if(errors){
            //     errors = errors.split(",")
            // }

            // ==========

            res.render("login")
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Login Check
    static async checkLogin(req, res) {
        try {
            let {username, password} = req.body

            let user = await User.findOne({
                where:{username}
            })

            if(!user){

                res.send("No users here with that detail: " + username)
            }
            
            let valid = await user.checkPassword(password)

            if (valid){
                res.send("Success Login Detail")
            }else{
                res.send("Wrong Login Detail")
            }
            // res.render("login")
        } catch (error) {
            console.log(error)
            res.send(error + " something went wrong brother "+user) 

            // Mengecek Error dari Validasi

            // ============
            // if (error.name === "SequelizeValidationError") {
            //     error = error.errors.map(el => {
            //         return el.message
            //     })
            //     console.log(error)

            //     // res.send(error)
            //     res.redirect(`/login?errors=${error}`)
            // } else {
            //     console.log(error)
            //     res.send(error)
            // }
            // ============   
        }
    }

    // Basic Page
    static async allThread(req, res) {
        try {

            
            
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