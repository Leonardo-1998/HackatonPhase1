const { where } = require('sequelize');
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
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const streamifier = require('streamifier')
const cloudinary = require('../config/cloudinary');
const { currentDate } = require('../helper/helper');


class Controller {
    //Home
    static async home(req, res) {
        try {
            let {username} = req.query
            let { userId, userRole } = req.session
            console.log(userId)
            let nameOfUser = await User.userName(userId)

            let {region} = req.query
            let Allhotels = await Hotel.findAll()
            let regionFilter = [...new Set(Allhotels.map(el => el.region))]
            // console.log(regionFilter)

            let queryRegion = region ? { region: { [Op.eq]: region } } : {}

            let hotels = await Hotel.findAll({
                where: queryRegion,
                include:{
                    model: Room
                }
            })
            // console.log(hotels)

            let amenities = await Amenity.findAll()
            // console.log(amenities)
            
            res.render('home',{
                hotels,
                regionFilter,
                region,
                userId,
                userRole,
                nameOfUser,
                amenities,
                username
            })

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
            const { username, password, email, name, phone_number} = req.body
            
            // Membuat data baru Table Users
           const newUser = await User.create({
                username,
                email,
                password,
                role: 'user'
            },{
                returning : true
            })

            console.log(newUser)

            await Profile.create({
                UserId: newUser.id,
                name,
                phone_number,
                profile_pic:"/assets/images/default-pic.png"
            })

            // res.send(user)
            res.redirect(`/login?username=${newUser.username}`)

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

            let { username } = req.query
            // Cek error 

            // ==========
            let { errors } = req.query

            if (errors) {
                errors = errors.split(",")
            }
            // ==========

            res.render("login", { errors, username})
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
                    res.redirect(`/home?username=${user.username}`) // <------------
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
            let { userId, userRole } = req.session
            console.log(userId)
            let nameOfUser = await User.userName(userId)

            let { UserId } = req.params

            // console.log(req.session)

            let userData = await User.findAll({
                include: [{
                    model: Profile
                }, {
                    model: Reservation,
                    include: {
                        model: Room,
                        include: {
                            model: Hotel
                        }
                    }
                }],
                where: {
                    id: +UserId
                }
            })

            userData = userData[0]
            let profileData = userData.dataValues.Profile
            let reservationData = userData.dataValues.Reservations

            // console.log(reservationData[0].dataValues.Room.dataValues.Hotel)

            // console.log(userData.dataValues)
            // console.log(profileData.dataValues)
            // console.log(reservationData[0].dataValues)

            // res.send(userData)
            res.render("./user/profile", { 
                userData, 
                profileData, 
                reservationData, 
                userId, 
                nameOfUser, 
                UserId 
            })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Logout
    static async logout(req, res) {
        try {
            req.session.destroy(function (error) {
                if (error) {
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

    // Edit Profile
    static async editProfile(req, res) {
        try {
            let { userId, userRole } = req.session
            console.log(userId)
            let nameOfUser = await User.userName(userId)

            let { UserId } = req.params

            let profile = await Profile.findOne({
                where: {
                    UserId: +UserId
                }
            })
            console.log(UserId)
            console.log(profile)
            // profile = profile[0]
            // console.log(UserId)
            // console.log(profile)

            res.render("./user/editProfile", { nameOfUser, profile, UserId, nameOfUser, userRole, userId })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Save Edited Profile
    static async saveProfile(req, res) {
        try {
            let { UserId } = req.params
            let {name,phone_number} = req.body

            let imageURL = null

            console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

            if(req.file){
                const streamUploader = (req) => {
                    return new Promise ((resolve,reject) => {
                        const stream = cloudinary.uploader.upload_stream((error,result) => {
                            console.log(result + "<<<<<<<<<<<<<<")
                            if (result){
                                resolve(result)
                            } else {
                                reject(result)
                            }
                        });
                        streamifier.createReadStream(req.file.buffer).pipe(stream)
                    })
                }
                const result = await streamUploader(req)
                console.log(result + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
                imageURL = result.secure_url
            }
            console.log(imageURL + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")


            const updateData = {
                name,
                phone_number
            }

            if (imageURL){
                updateData.profile_pic = imageURL
            }

            // console.log("123456")

            await Profile.update(updateData ,{
                where : {
                    UserId : +UserId
                }
            })

            // console.log(req.body)
            

            res.redirect(`/user/${UserId}/profile`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Room Detail
    static async roomDetailAndReserve(req, res) {
        try {
            let { userId, userRole } = req.session
            // console.log(userId)
            let nameOfUser = await User.userName(userId)

            let { errors } = req.query

            if (errors) {
                errors = errors.split(",")
            }

            let { UserId, RoomId } = req.params
            let room = await Room.findAll({
                where: {
                    id: +RoomId
                },
                include: {
                    model: Hotel
                }
            })

            room = room[0]

            // console.log(room)
            res.render("roomdetail", {
                UserId, 
                RoomId, 
                room, 
                userId, 
                userRole, 
                nameOfUser,
                errors,
                currentDate : currentDate()
             })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // saveReserve
    static async saveReserve(req, res) {
        try {
            // console.log("=========================")
            // res.send("123456")

            let { check_in, check_out } = req.body
            let { UserId, RoomId } = req.params

            let checkIn = new Date(check_in)
            let checkOut = new Date(check_out)

            let duration = checkOut.getDate() - checkIn.getDate()

            let room = await Room.findAll({
                where: {
                    id: RoomId
                }
            })

            room = room[0]
            // console.log(room)
            let totalPrice = duration * room.price
            // console.log(totalPrice)

            let temp = await Reservation.create({UserId,RoomId,check_in,check_out,totalPrice})


            // res.send("123")
            res.redirect(`/user/${UserId}/profile`)
        } catch (error) {
            // console.log(req.body)
            // console.log(error)
            // res.send(error)

            let {UserId, RoomId} = req.params
            if (error.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
                error = error.errors.map(el => {
                    return el.message
                })
                // console.log(error)

                // res.send(error)
                res.redirect(`/user/${UserId}/roomdetail/${RoomId}?errors=${error}`)
            } else {
                console.log(error)
                res.send(error)
            }
        }
    }

    // Delete Reservation
    static async deleteReservation(req, res) {
        try {
            let {UserId, ReserveId} = req.params
            // Log the configuration
            
            await Reservation.destroy({
                where:{
                    id : +ReserveId
                }
            })
            
            res.redirect(`/user/${UserId}/profile`)
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