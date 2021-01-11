const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// exportar el modelo user
// ya que el mismo puede interactuar con la db
const User = require('../models/User');

// definir una nueva estrategia para autenticar
passport.use(new LocalStrategy({
    // pasar los parametros de que datos vamos a recibir
    usernameField: 'email',
    passwordField: 'password'

    // una vez que se reciba los datos se jecuta una función
}, async (email, password, done) => {

    // comprobar si existe el correo del usuario
    const user = await User.findOne({email});
    if (!user) {
        // si no existe el usuario retornar un error
        return done(null, false, { message: 'Not User Found' });
    } else {
        // si el correo existe validar contraseña
        // compara la contraseña que pasa el user con la contraseña que esta en la db
        const match= await user.matchPassword(password)
        if (match) {
            return done(null, user);
        } else {
            // si no coinciden las contraseñas
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
}));

// cuando el usuario se haya registrado, lo vamos a guardar en nuestra sesion del servidor
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// cuando el usuario empiece a navegar, passport va a verificar si ese id tiene autorizacion
passport.deserializeUser((id, done) => {
    // comprobar en la db si el user con ese id tiene permisos para navegar o si existe
    User.findById(id, (err, user) => {
        // si es encontrado, va a terminar con la sesion del usuario, va a obtener los datos relacionados con el usuario
        done(err, user);
    })
});