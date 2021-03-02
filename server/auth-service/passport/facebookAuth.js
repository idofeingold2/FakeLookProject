const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy
const keys = require('../config/keys');
const userLogic = require('../logic/user-logic');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userLogic.getUserById(id);
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: keys.facebook.appId,
    clientSecret: keys.facebook.appSecret,
    callbackURL: keys.facebook.callbackUrl,
    profileFields: ['id', 'displayName', 'name', 'emails']
},
    async (accessToken, refreshToken, profile, done) => {
        userLogic.getUserByEmail(profile.emails[0].value)
            .then(user => {
                if (!user) {
                    userLogic.createUser(
                        profile.emails[0].value,
                        profile.emails[0].value,
                        profile.id,
                        true
                    )
                        .then(createdUser => {
                            if (createdUser.err) {
                                throw new Error(createdUser.err.message);
                            } else {
                                createdUser.firstName = profile.name.givenName;
                                createdUser.lastName = profile.name.familyName;
                                return done(null, createdUser);
                            }
                        })
                        .catch(err => {
                            return done(null, { id: 0, err });
                        });
                }
                else if (!user.isOAuth) {
                    throw new Error('The user with this email has registered via form and not via Facebook. Please sign in as before.');
                } else {
                    user.firstName = profile.name.givenName;
                    user.lastName = profile.name.familyName;
                    return done(null, user);
                }
            })
            .catch(err => {
                return done(null, { id: 0, err });
            });
    }
));