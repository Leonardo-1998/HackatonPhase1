// Untuk handler disimpan dalam bentuk function jangan route
// Function untuk mengecek logged in atau tidak

const isLoggedIn = function(req,res,next){
    console.log(req.session);
    if(!req.session.userId){
        const error = "Please login first!"
        res.redirect(`/login?errors=${error}`)
    } else {
        next()
    }
}

// Function untuk mengecek admin atau bukan
const isAdmin = function(req,res,next){
    // console.log(req.session);
    if(req.session.userId && !req.session.userRole !== "admin"){
        const error = "You have no access!"
        res.redirect(`/login?errors=${error}`)
    } else {
        next()
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}