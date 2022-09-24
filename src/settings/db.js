//archivo para la coneccion con mysql
const mysql = require('mysql')
const { promisify } = require('util')
const { database } = require('./keys')

const pool = mysql.createPool(database)

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code == 'PROTOCOL_CONNECTION_LOST') 
            console.log('LA CONEXION DE LA BASE DE DATOS FUE CERRADA')

        if (err.code == 'ECONNREFUSED')
            console.log('LA CONEXION DE LA BASE DE DATOS FUE RECHASADA')
    }

    if (connection)
        connection.release();

    console.log('DB IS CONNECT ON CLEVER-CLOUD')
    return
    
})

//la conexion a la base de datos es un evento el cual genera una promesa
//ya que
pool.query = promisify(pool.query)

module.exports = pool
