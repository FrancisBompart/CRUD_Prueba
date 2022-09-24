const bcryptjs = require('bcryptjs') //modulo para cifrar las contraseñas

const helpers = {}

//solicitud para encriptar una contraseña
helpers.encryptPass = async (password) => {
    const salt = await bcryptjs.genSalt(10) //los saltos son...
    const hash = await bcryptjs.hash(password, salt)
    return hash   
}

//solicitud para desencriptar una contraseña
helpers.matchPass = async (password, savedPassword) => {
    try {
        return bcryptjs.compare(password, savedPassword) //retorna la comparacion entre la contraseña encriptada y la que no
    } catch (error) {
        console.log('error')
    }
}

module.exports = helpers 