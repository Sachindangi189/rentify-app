const path = require('path');
const User = require('../models/user');

exports.getSignup = (req, res) => {
    res.render('signup', { title: 'Sign Up' });
};

exports.postSignup = async (req, res) => {
  try{
      const { username, email, password } = req.body;
    const newUser = new User({username, email });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.flash('success', 'User registered successfully!');
    res.redirect('/listing');
  }
    catch (error) {
        console.error(error);
        req.flash('success', 'user already exists');
        res.redirect('/signup');
    }
}