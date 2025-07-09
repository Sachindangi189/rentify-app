const express = require('express');
const path = require('path');
const reviewRoute = express.Router();

const reviewPath = require('../controllers/reviewController');
const {isLoggedIn, isReviewAuthor } = require('../middleware');


reviewRoute.post('/listing/:id/review', reviewPath.addReview);
reviewRoute.delete('/listing/:id/review/:reviewsId',isLoggedIn,isReviewAuthor, reviewPath.deleteReview);

module.exports = reviewRoute;