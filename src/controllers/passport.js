const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const helpers = require('./helpers')

const pool = require('../settings/db')

passport.use('local.signup', new LocalStrategy(
    {
    usernameField: 'username',
    passwordField: 'password',
    passReqCallback: true
    },
    async (req, username, password, done) => {
    const { nombre, apellido, Documento } = req.body; //obtenidos del cuerpo del html de signup
    let documento = parseInt(Documento);
    let newUser = {
        username,
        password,
        nombre,
        apellido,
        documento
    }
    console.log(password)
    newUser.password = helpers.encryptPass(password) //estamos almacenando la contraseña encriptada
    console.log(password)
    //INSERCION DE USUARIO EN BDD
    const result = await pool.query('INSERT INTO users SET ?', newUser)
    newUser.id = result.insertId //no entiendo esto
    return done(null, newUser)
}))

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const resp = await pool.query('SELECT * FROM users WHERE username =?', [username])
    if (resp.length > 0) {
        const user = res[0]
        const validPass = helpers.matchPass(password, user.password)
        if (validPass)
            done(null, user)
        else
            done(null, false)
    }
    else
        return done(null, false)    
}))

//proceso de serializacion, cuando tengamos un inicio de sesion activo
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const resp = await pool.query('SELECT * FROM users WHERE id =?', [id])
    done(null, resp[0])
})