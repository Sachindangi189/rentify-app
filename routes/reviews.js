const express = require('express');
const path = require('path');
const reviewRoute = express.Router();

const reviewPath = require('../controllers/reviewController');

reviewRoute.post('/listing/:id/review', reviewPath.addReview);
reviewRoute.delete('/listing/:id/review/:reviewsId',reviewPath.deleteReview);

module.exports = reviewRoute;