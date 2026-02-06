const routes = require('express').Router();
const jobs = require('../controllers/jobController');

routes.get('/', jobs.getAllJobs);
routes.get('/:job_id', jobs.getJobById);

routes.post('/', jobs.createJob);

module.exports = routes;