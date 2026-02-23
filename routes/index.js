const express = require('express');
const routes = express.Router();


//Login/landing page route
routes.get('/', (req, res) => {
	res.send('Login');
});

//Dashborad route
routes.get('/dashboard', (req, res) => {
	res.send('Dashboard');
});

routes.use('/', require('./swagger')); // Swagger documentation route
routes.use('/jobs', require('./job'));
routes.use('/companies', require('./company'));

module.exports = routes;