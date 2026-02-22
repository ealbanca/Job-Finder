const routes = require('express').Router();

//import jobController functions and use them as route handlers
const jobController = require('../controllers/jobController');
const { jobValidationRules } = require('../middleware/validation');

routes.get('/', ...jobValidationRules.getAllJobs, jobController.getAllJobs);
routes.get('/:id', ...jobValidationRules.getJobById, jobController.getJobById);
routes.post('/', ...jobValidationRules.createJob, jobController.createJob);
routes.put('/:id', ...jobValidationRules.updateJobById, jobController.updateJobById);
routes.delete('/:id', ...jobValidationRules.deleteJobById, jobController.deleteJobById);

module.exports = routes;