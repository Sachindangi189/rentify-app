const mongoose = require('mongoose');
const listing = require('../models/listing');
const initData = require('./data');

const MONGO_URL = "mongodb://127.0.0.1:27017/rentify";
main().then(() =>{
 console.log('successfully connected to db');
})
.catch(error =>{
console.log(error);
})

async function main(){
  await mongoose.connect(MONGO_URL);
}

const initDb = async () =>{
await listing.deleteMany({});
initData.data = initData.data.map((obj) => ({
  ...obj,
  owner: '686bbef4805ee7d0765022ee'
}));
await listing.insertMany(initData.data);
console.log('data is initilise');
}

initDb();