//en cada controlador se establece una conexion a la base de datos

const pool = require('../settings/db')

let admin = (req, res) => {
    res.render('admin')
}


module.exports = {
    admin,
}