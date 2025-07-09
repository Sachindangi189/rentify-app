const path = require('path');
const Listing = require('../models/listing');
const Review = require('../models/review');


// ya route review ko add krne k liye h
exports.addReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.Review);
  newReview.author = req.user._id; // Set author to current user's id
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash('success', 'Review added successfully!');
  res.redirect(`/listing/${listing._id}`);
}

// ya route review ko delete krne k liye h
exports.deleteReview = async(req,res) => {
  let {id, reviewsId} = req.params;
 await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
  await Review.findByIdAndDelete(reviewsId);
  req.flash('success', 'Review deleted successfully!');
  res.redirect(`/listing/${id}`);
}