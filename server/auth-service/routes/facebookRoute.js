const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../helpers/helpers');
require('../passport/facebookAuth');

router.get('/',
    passport.authenticate('facebook', {
        scope: ['email']
    }));

router.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        const token = helpers.tokenGenerator({id: req.user.id, email: req.user.email});
        res.cookie('token', token, {maxAge: 15 * 60 * 1000, httpOnly: true});
        res.cookie('isLoggedIn', true, {httpOnly: true});
        res.send('user sent');
    });

module.exports = router;