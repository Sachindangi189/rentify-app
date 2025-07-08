const express = require('express');
const path = require('path');
const loginRoute = express.Router();

const login = require('../controllers/loginController');
const { saveRedirectUrl } = require('../middleware');

loginRoute.get('/signup', login.getSignup);
loginRoute.post('/signup',login.postSignup);
loginRoute.get('/login',  login.getLogin);
loginRoute.post('/login', login.postLogin);
loginRoute.get('/logout', login.getLogout);


module.exports = loginRoute;