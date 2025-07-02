const express = require('express');
const path = require('path');
const homeRoute = express.Router();

const homePath = require('../controllers/homePage');

homeRoute.get('/listing',homePath.homes);
homeRoute.get('/listing/new',homePath.addNew);
homeRoute.get('/listing/:id',homePath.showHome);
homeRoute.post('/listing',homePath.addHome);
homeRoute.get('/listing/:id/edit',homePath.editHome);
homeRoute.put('/listing/:id/',homePath.updateHome);
homeRoute.delete('/listing/:id',homePath.deleteHome);

module.exports = homeRoute;
