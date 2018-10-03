var express = require('express');
var passport = require('passport');
var router = express.Router();

const User = require('../models/users');

router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log(req, req.user)
    res.json(req.user)
});

router.post('/register', function(req, res) {
  console.log('req.body', req.body)
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log('failed to register', err)
        }

        passport.authenticate('local')(req, res, function () {
            console.log('registered and logged in ')
        });
    });
});


module.exports = router;
