const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const mthodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const homeController = require('./routes/homeRouter');
const errorRoutes = require('./routes/errorRoutes');
const { error } = require('console');

const app = express();


// set views
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); 
app.set('views','views');

// set static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mthodOverride('_method'));

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

app.use('/',homeController);
app.use(errorRoutes);


const PORT = 3000;
app.listen(PORT,() =>{
  console.log(`server is running at the https://localhost:${PORT}`);
});