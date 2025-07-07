const express = require('express');
const path = require('path');
const loginRoute = express.Router();

const login = require('../controllers/loginController');

loginRoute.get('/signup', login.getSignup);
loginRoute.post('/signup', login.postSignup);


module.exports = loginRoute;