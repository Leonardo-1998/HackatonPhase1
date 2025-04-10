const express = require('express')
const router = require('./routers/router')
const app = express()
const session = require('express-session')
const port = 3000
const path = require('path')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.use(session({
  secret: 'Secret Key', // Harus ada 
  resave: false,
  // resave: false, // Hanya menimpan perubahan pada saat ada perubahan (False)
  // - Lebih baik false agar tidak membebani memory 
  // resave: true, // Menyimpan semua baik ada perubahan ada tidak
  saveUninitialized: false,
  // saveUninitialized: false, // Hanya menimpan perubahan pada saat ada perubahan
  // - Lebih baik digunakan pada login session
  // - Agar tidak melakukan save pada user yang masuk ke dalam login dan belum login 
  // saveUninitialized: true, // Menyimpan semua baik ada perubahan ada tidak
  cookie: {
    secure: false,
    sameSite: true // Untuk security dari crsf attack - Cek sendiri untuk cek crsf attack
  }
  // Untuk development gunakan saja false
  // Gunakan secure : true - untuk menjadi Https (Production)
  // Untuk https <Secure>
}))

app.use(router);

console.log("Hello world")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})