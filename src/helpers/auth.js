const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    // validacion para verificar si el usuario esta autenticado
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/signin');
}

module.exports = helpers;