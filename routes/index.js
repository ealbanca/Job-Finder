const routes = require('express').Router();
const job = require('./job');

routes.use('/job', job);

module.exports = routes;