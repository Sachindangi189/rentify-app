const path = require('path');
const Listing = require('../models/listing');
// const initData = require('../initliseDatabase/data');

// ya route home ki list show krta h
exports.homes = async (req,res) =>{
  const allListing = await Listing.find({});
  res.render('home',{allListing});
}
// ya route h new home ko add k liye
exports.addNew = (req,res) =>{
  res.render('addNew');
}

// ya route individual home ki details k liye
exports.showHome = async (req,res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render('show',{listing});
}

