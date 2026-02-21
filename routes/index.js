const express = require('express');
const routes = express.Router();

// Home route - welcome message
routes.get('/', (req, res) => {
	res.send('Welcome to the Jobs API!');
});

routes.use('/', require('./swagger')); // Swagger documentation route
routes.use('/jobs', require('./job'));
routes.use('/companies', require('./company'));

module.exports = routes;