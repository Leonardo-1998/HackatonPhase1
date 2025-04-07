const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.empty)

module.exports = router