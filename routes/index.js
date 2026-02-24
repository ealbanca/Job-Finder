const express = require('express');
const routes = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');


//Login/landing page route
routes.get('/', ensureGuest, (req, res) => {
	res.render('login', { layout: 'login' });
});

//Dashborad route
routes.get('/dashboard', ensureAuth, (req, res) => {
	res.render('dashboard');
});

// Swagger documentation route
routes.use('/', require('./swagger')); 
routes.use('/jobs', ensureAuth, require('./job'));
routes.use('/companies', ensureAuth, require('./company'));

module.exports = routes;