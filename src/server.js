const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// initializations
const app = express();

// importar configuracion de passport
require('./config/passport');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
// vamos a estar enviando el metodo que queremos a traves de una consulta
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// middleware de passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// global variables
// toda la aplicacion puede acceder a las variables globales
// definimos nuestro propio middleware
app.use((req, res, next) => {
    // req.flash nos va a retornar el valor de succes_msg
    // una vez lo devuelva lo guardamos en la variable del servidor
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    // guardar al usuario en una variable global para poder reutilizarlo
    // passport lo guarda en una variable de req.user
    // con esta variable user puedo saber si el usuario fue autenticado o no
    res.locals.user = req.user || null;
    next();
});

// routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;