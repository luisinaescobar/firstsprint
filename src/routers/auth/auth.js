const passport = require('passport');
const Auth0Strategy = require('passport-auth0').Strategy;
require('dotenv').config()
const express = require('express');
const { encript } = require('../../middlewares/middlewares');
const router = express.Router();
const { getModel } = require('../../database/index');
const { findCreateUser } = require('../../config/db');
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new Auth0Strategy({

    clientID: 'OpGnuHXzms04RyNSb0jN6LlycuN0Vu5s',
    clientSecret: 'YRy5rTVs961gqZtE94thN4rceNJtt39DcF2oo__fiOkLAjf0hyK2cQfih9mwVX1m',
    callbackURL: 'http://localhost:5000/auth0/callback',
    domain: 'dev-fh5mfbki.us.auth0.com',
}, (accessToken, refreshToken, extraParams, profile, done) => {
    if (profile) {
        console.log(profile)
        findCreateUser(profile)
        profile1 = profile
        return done(null, profile);
    } else {
        return done(new Error('profile does not exist'));
    }
}));
function getProfile() {
    return profile1;
}
router.get('/login/auth0', passport.authenticate('auth0', {
    prompt: 'login',
    scope: 'openid profile'
}));
router.get('/auth0/callback', passport.authenticate('auth0', {
    failureRedirect: '/error',
    successRedirect: '/v1/token'

}));
router.get('logout', (req, res) => {
    req.logOut()
    res.json('sesion finalizada')
})

module.exports = { router, getProfile }
