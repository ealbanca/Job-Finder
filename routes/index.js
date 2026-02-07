const routes = require('express').Router();
const job = require('./job');

routes.use('/', require('./swagger')); // Swagger documentation route
routes.use('/job', job);

module.exports = routes;