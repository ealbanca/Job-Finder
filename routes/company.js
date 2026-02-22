const routes = require('express').Router();

//import companyController functions and use them as route handlers
const companiesController = require('../controllers/companyController');
const { companyValidationRules } = require('../middleware/validation');

routes.get('/', ...companyValidationRules.getAllCompanies, companiesController.getAllCompanies);
routes.get('/:id', ...companyValidationRules.getCompanyById, companiesController.getCompanyById);
routes.post('/', ...companyValidationRules.createCompany, companiesController.createCompany);
routes.put('/:id', ...companyValidationRules.updateCompanyById, companiesController.updateCompanyById);
routes.delete('/:id', ...companyValidationRules.deleteCompanyById, companiesController.deleteCompanyById);

module.exports = routes;