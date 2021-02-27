const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const userLogic = require('../logic/user-logic');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userLogic.getUserById(id);
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,
    callbackURL: keys.google.callbackUrl,
},
    async (accessToken, refreshToken, profile, done) => {
        let user = await userLogic.getUserByEmail(profile.emails[0].value);
        if (!user) {
            user = await userLogic.createUser(
                profile.name.givenName,
                profile.name.familyName,
                profile.displayName.replace(' ', ''),
                profile.emails[0].value,
                profile.id,
                true
            );
            console.log('created user');
        } else {
            console.log('got user');
        }
        done(null, user);
    }
));