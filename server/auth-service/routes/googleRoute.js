const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport/googleAuth');

router.get('/',
  passport.authenticate('google', { 
      scope: [ 'profile', 'email' ] 
    }));

router.get('/callback',  
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.send(req.user);
  });

  module.exports = router;