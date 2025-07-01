const express = require('express');
const path = require('path');
const homeRoute = express.Router();

const homePath = require('../controllers/homePage');

homeRoute.get('/listing',homePath.homes);
homeRoute.get('/listing/new',homePath.addNew);
homeRoute.get('/listing/:id',homePath.showHome);


module.exports = homeRoute;
