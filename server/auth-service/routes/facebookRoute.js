const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport/facebookAuth');

router.get('/',
    passport.authenticate('facebook', {
        scope: ['email']
    }));

router.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        res.send(req.user);
    });

module.exports = router;