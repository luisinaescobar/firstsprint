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

    clientID: process.env.AUTH0_CLIENTID,
    clientSecret: process.env.AUTH0_SECRET,
    callbackURL: process.env.AUTH0_BASEURL,
    domain: process.env.AUTH0_ISSUER_BASEURL,
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
    successRedirect: '/v1/token'
}));
router.get('logout', (req, res) => {
    req.logOut()
    res.json('sesion finalizada')
})

module.exports = { router, getProfile }
