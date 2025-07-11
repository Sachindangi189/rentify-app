const express = require('express');
const path = require('path');
const homeRoute = express.Router();

const homePath = require('../controllers/homePage');
const multer = require('multer');
const { cloudinary, storage } = require('../cloudConfi');
const upload = multer({ storage: storage });

homeRoute.get('/listing', homePath.homes);
homeRoute.get('/listing/new', homePath.addNew);
homeRoute.post('/listing',upload.single('listing[image]') ,homePath.addHome);
homeRoute.get('/listing/:id/edit', homePath.editHome);
homeRoute.get('/listing/:id', homePath.showHome);
homeRoute.put('/listing/:id',upload.single('listing[image]'), homePath.updateHome);
homeRoute.delete('/listing/:id', homePath.deleteHome);

module.exports = homeRoute;
