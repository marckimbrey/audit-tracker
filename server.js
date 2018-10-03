const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const dburl = process.env.MONGODB_URI || "mongodb://marc:lwg4614@ds163162.mlab.com:63162/bins";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const bins = require('./routes/bins');
const users = require('./routes/users');

app.use(bodyParser.json()); // for parsing application/json



app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/bins', bins);
app.use('/api/users', users);

// passport config
var User = require('./models/users');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// connect to mongodb database
mongoose.connect(dburl, (err) => {
  if (err) throw err;
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
