const userCtrl = {};

userCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}

userCtrl.signup = (req, res) => {
    res.send('signup');
}

userCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
}

userCtrl.signin = (req, res) => {
    res.send('signin');
}

userCtrl.logout = (req, res) => {
    res.send('logout');
}

module.exports = userCtrl;