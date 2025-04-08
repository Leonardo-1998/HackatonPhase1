class Controller {
    // Register Form
    static async formRegister(req, res) {
        try {
            // Tampilkan error apa saja yang muncul

            // ==========
            // let {errors} = req.query

            // if(errors){
            //     errors = errors.split(",")
            // }

            // ==========

            res.render("register")
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    // Ketika menekan tombol register
    static async saveRegister(req, res) {
        try {
            // Perlu di tambahkan

            const { username, password, role } = req.body

            // let createUser = await Model.create({username:username, password:password, role:role})

            res.redirect("/login")
        } catch (error) {
            console.log(error)
            res.send(error)

            // Masukkan validation disini
            
            // ============
            // if (error.name === "SequelizeValidationError") {
            //     error = error.errors.map(el => {
            //         return el.message
            //     })
            //     console.log(error)

            //     // res.send(error)
            //     res.redirect(`/register?errors=${error}`)
            // } else {
            //     console.log(error)
            //     res.send(error)
            // }
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
            // Mengambil data dari form
            // let {username, password} = req.body

            // let A = await Model.findAll({
            //     where : {

            //     }
            // })

            res.render("login")
        } catch (error) {
            console.log(error)
            res.send(error)

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

            // let X = await Model.findAll({
            //     include: {
            //         model: A
            //     }
            // })
            
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