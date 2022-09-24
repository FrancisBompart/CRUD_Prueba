const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const session = require('express-session') //no entendi
const passport = require('passport')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const path = require('path')
const { database } = require('./settings/keys')
const MySQLStore = require('express-mysql-session')(session)

const app = express()

require('./controllers/passport')

//session
//aqui lo estamos definiendo mas no lo estamos utilizando
app.use(session({
    secret: 'CursoCRUD',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//rutas globales para usar el id del usuario para cualquier parte de la app
app.use((req, res, next) => {
    app.locals.user = req.user
    next()
})

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')
app.engine('.hbs', hbs.engine({
    defaultLayout : 'main', //nombre del archivo inicial
    layoutsDir: path.join(app.get('views'), 'layout'), //accedemos a la carpeta views, y de ahi requerimos la carpeta layouts
    partialsDir: path.join(app.get('views'), 'partials'),//secciones de codigo que se usaran en cualquier parte de la aplicacion
    extname: '.hbs',
}))

//routes
app.use(require('./routes/app'))
app.use('./support', require('./routes/admin'))
app.use('./req', require('./routes/authentication'))

//middleware
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public'))) //para poder acceder a los archivos estaticos
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json(({extended: true})))

app.listen(app.get('port'), () => {
    console.log('server on port '+app.get('port'))
})