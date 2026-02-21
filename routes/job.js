const routes = require('express').Router();

//import jobController functions and use them as route handlers
const jobController = require('../controllers/jobController');

routes.get('/', jobController.getAllJobs);
routes.get('/:id', jobController.getJobById);

routes.post('/', jobController .createJob);

module.exports = routes;