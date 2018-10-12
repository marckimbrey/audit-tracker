var express = require('express');
var passport = require('passport');
var router = express.Router();
var jwt = require('jsonwebtoken')

const User = require('../models/users');

// router.post('/login', passport.authenticate('local'), function(req, res) {
//     console.log(req, req.user)
//     res.json(req.user.username)
// });

router.post('/login', passport.authenticate('local'), function(req, res) {
  // create jwt
  console.log(req.body)
  var token = jwt.sign({user: req.body }, 'Costa Rica')

  res.json({username: req.body.username, token: token, authenticated: true});
});

router.post('/verifyToken', passport.authenticate('jwt'), function(req, res) {
  // find user
  console.log('login user using token', req.user)
  // return user
    res.json({user:{username: req.user.username, token: req.body.token, authenticated: true}});
});

router.get('/logout', function(req, res) {
    if (req.session) {
      req.logout()
      res.end()
    } else {
      res.end('no user logged in')
    }
});

router.post('/register', function(req, res) {
  console.log('req.body', req.body)
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log('failed to register', err)
        }

        passport.authenticate('local')(req, res, function () {
            console.log('registered and logged in ')
            var token = jwt.sign({user: user }, 'Costa Rica')

            res.json({username: user.username, token: token, authenticated: true});
        });
    });
});


module.exports = router;
