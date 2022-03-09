const passport = require('passport');
const Auth0Strategy = require('passport-auth0').Strategy;
require('dotenv').config()
const express = require('express');
const router = express.Router();
const { findCreateUser } = require('../../config/db');
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new Auth0Strategy({
state: true,
    clientID: 'OpGnuHXzms04RyNSb0jN6LlycuN0Vu5s',//process.env.AUTH0_CLIENTID,
    clientSecret: 'YRy5rTVs961gqZtE94thN4rceNJtt39DcF2oo__fiOkLAjf0hyK2cQfih9mwVX1m',//process.env.AUTH0_SECRET,
    callbackURL: 'https://www.madariaga.tk/api/auth0/callback', //process.env.AUTH0_BASEURL,
    domain:'dev-fh5mfbki.us.auth0.com' //process.env.AUTH0_ISSUER_BASEURL,
}, (accessToken, refreshToken, extraParams, profile, done) => {
    if (profile) {
        console.log(profile)
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
    successRedirect: '/api/token/'
}));
router.get('/logout', (req, res) => {
    req.logOut()
    res.json('sesion finalizada')
})

module.exports = { router, getProfile }
