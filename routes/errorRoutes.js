const path = require('path');
const express = require('express');
const errorController = require('../controllers/errorController');
const errorRoute = express.Router();

// Route for handling 404 errors
errorRoute.get('/', errorController.pageNotFound);

module.exports = errorRoute;