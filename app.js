const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const mthodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const user = require('./models/user');

const homeController = require('./routes/homeRouter');
const reviewController = require('./routes/reviewsRoute');
const loginRoute = require('./routes/loginRoute');
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

const sessionOptions = {
  secret: "thisshouldbeasecret",
  resave : false,
  saveUninitialized : true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
  }
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



// Custom middleware to set flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.update = req.flash('update');
  res.locals.currentUser = req.user; // Make currentUser available in all views
  next();
});

app.use('/',homeController);
app.use('/',reviewController);
app.use('/',loginRoute);
app.use(errorRoutes);


const PORT = 3000;
app.listen(PORT,() =>{
  console.log(`server is running at the https://localhost:${PORT}`);
});