const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy
const keys = require('../config/keys');


passport.use(new FacebookStrategy({
    clientID: keys.facebook.appId,
    clientSecret: keys.facebook.appSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));