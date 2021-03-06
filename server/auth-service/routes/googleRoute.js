const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../helpers/helpers');
require('../passport/googleAuth');

router.get('/',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    if(req.user.err){
      return res.status(404).send(req.user.err.message);
    }
    const token = helpers.tokenGenerator({ id: req.user.id, email: req.user.email });
    res.cookie('token', token, { maxAge: 15 * 60 * 1000, httpOnly: true });
    const userDetails = {
      id: req.user.id, 
      email: req.user.email, 
      username: req.user.username, 
      firstName: req.user.firstName, 
      lastName: req.user.lastName
  }
  // res.cookie('details', userDetails, {httpOnly: true});
    res.send(userDetails);
  });

module.exports = router;