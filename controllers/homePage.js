const path = require('path');
const Listing = require('../models/listing');
const Review = require('../models/review');
const { isLoggedIn, isOwner } = require('../middleware');
// const initData = require('../initliseDatabase/data');

// ya route home ki list show krta h
exports.homes = async (req,res) =>{
  const allListing = await Listing.find({});
  res.render('home',{allListing});
}
// ya route h new home ko add k liye form show krta h
exports.addNew = (req, res, next) => {
  isLoggedIn(req, res, () => {
    res.render('addNew');
  });
};


// ya route individual home ki details k liye
exports.showHome = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
     .populate({
      path: 'reviews',
      populate: { path: 'author' }
    })
    .populate('owner');

  if (!listing) {
    req.flash('success', 'Home not found!');
    return res.redirect('/listing');
  }
  res.render('show', { listing });
}

// ya route home ko add krne k liye h
exports.addHome = async (req,res) =>{
  let url = req.file.path; // Assuming the file is uploaded to a local path
  let filename = req.file.filename; // Extracting filename from the uploaded file
  const {title,description,image,price,location,country} = req.body;
  const newListing = new Listing({
    title,
    description,
    image: {
      url: image, // Assuming image is a URL
      filename: "user-uploaded"// Extracting filename from URL
    },
    price,
    location,
    country
  });
  newListing.owner = req.user._id; 
  newListing.image = {url: url, filename: filename}; // Storing the image URL and filename
  await newListing.save();
  req.flash('success', 'Home added successfully!');
  res.redirect('/listing');
}

// edit krna k liye 
exports.editHome = [isLoggedIn,isOwner, async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render('edit', { listing });
}];

// put request for updating the home
exports.updateHome = [isLoggedIn,isOwner, async (req, res) => {
  const { id } = req.params;
  const { title, description, image, price, location, country } = req.body;
  await Listing.findByIdAndUpdate(id, {
    title,
    description,
    image,
    price,
    location,
    country
  });
  req.flash('update', 'Home updated successfully!');
  res.redirect(`/listing/${id}`);
}]

// ya route home ko delete krne k liye h
exports.deleteHome = [isLoggedIn,isOwner, async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash('success', 'Home deleted successfully!');
  res.redirect('/listing');
}];
