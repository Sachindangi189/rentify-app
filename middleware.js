const Listing = require('./models/listing');
const Review = require('./models/review');



module.exports.isLoggedIn = (req, res, next) => {
  req.session.redirectUrl = req.originalUrl; // Store the original URL to redirect after login
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to do that');
    return res.redirect('/login');
  }
  next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id); // Await the DB call
  if (!listing.owner.equals(res.locals.currentUser._id)) {
    req.flash('success', 'You do not have permission to do that');
    return res.redirect(`/listing/${id}`);
  }
  next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewsId } = req.params;
  const review = await Review.findById(reviewsId);
  if (!review) {
    req.flash('error', 'Review not found');
    return res.redirect('/listing');
  }
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash('error', 'You do not have permission to do that');
    return res.redirect(`/listing/${review.listing}`);
  }
  next();
}

