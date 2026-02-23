const GoogleStartegy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = function(passport) {
    passport.use(new GoogleStartegy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
    }))

    // Serialize and deserialize user to support persistent login sessions broyght from https://www.passportjs.org/tutorials/password/session/
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) =>
            done(err, user));
    });
}