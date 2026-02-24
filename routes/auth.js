const express = require('express');
const passport = require('passport');
const routes = express.Router();


//Authnticate with Google route
routes.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//Google auth callback route. If authentication fails, redirect to the login page. If successful, redirect to the dashboard.
routes.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
});

//Logout route. Logs the user out and redirects to the homepage.
routes.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return res.status(500).send('Logout failed'); }
        res.redirect('/');
    });
});

module.exports = routes;