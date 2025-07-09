const path = require('path');
const User = require('../models/user');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');

exports.getSignup = (req, res) => {
    res.render('signup', { title: 'Sign Up' });
};

exports.postSignup = async (req, res) => {
  try{
    const { username, email, password } = req.body;
    const newUser = new User({username, email });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    // Automatically log in the user after registration
    req.login(registerUser, (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/signup');
      }
       req.flash('success', 'User registered successfully!');
       res.redirect('/listing');
    });
    
  }
    catch (error) {
        console.error(error);
        req.flash('success', 'user already exists');
        res.redirect('/signup');
    }
}

exports.getLogin = (req, res) => {
    res.render('login', { title: 'Login' });
}

exports.postLogin = [saveRedirectUrl,(req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.flash('success', 'Logged in successfully!');
      let redirectUrl = res.locals.redirectUrl || '/listing'; // Default redirect URL
      return res.redirect(redirectUrl);
    });
  })(req, res, next);
}];



exports.getLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/listing');
        }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/login');
    });
}
