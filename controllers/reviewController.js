const path = require('path');
const Listing = require('../models/listing');
const Review = require('../models/review');

// ya route review ko add krne k liye h
exports.addReview = async (req, res) => {
  let listing =  await Listing.findById(req.params.id);
  let newReview = new Review(req.body.Review);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  
  res.redirect(`/listing/${listing._id}`);

}

// ya route review ko delete krne k liye h
exports.deleteReview = async(req,res) => {
  let {id, reviewsId} = req.params;
 await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
  await Review.findByIdAndDelete(reviewsId);
  res.redirect(`/listing/${id}`);
}