const userCtrl = {};

const passport = require('passport');

// models
const User = require('../models/User');

userCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}

userCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        errors.push({text: 'Password do not match'});
    }
    if (password.length < 4) {
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('succes_msg', 'You are registered');
            res.redirect('/users/signin');
        }
    }
}

userCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
}

// el metodo authenticate puede validar cierta autenticacion que ya se ha definido, basado en lo que hemos escrito en el local strategy 
userCtrl.signin = passport.authenticate('local', {
    // si existe un error lo redirecciona
    failureRedirect: '/users/signin',

    // si esta todo ok
    successRedirect: '/notes',

    // cuando exista un mensaje de error usara flash
    failureFlash: true
});

userCtrl.logout = (req, res) => {
    // para cerrar la sesion
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/signin');
}

module.exports = userCtrl;