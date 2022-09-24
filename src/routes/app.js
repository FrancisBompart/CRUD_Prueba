const express = require('express')
const public = require('../controllers/c_app') //esta variable contendra todos los modulos que se iran creando para los controladores

const app = express.Router()

//principal
app.get('/', public.index)

//errores
app.get('/error', (req, res) => {
    res.render('error')
})

module.exports = app