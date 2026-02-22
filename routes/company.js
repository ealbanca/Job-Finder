const routes = require('express').Router();

//import companyController functions and use them as route handlers
const companiesController = require('../controllers/companyController');

routes.get('/', companiesController.getAllCompanies);
routes.get('/:id', companiesController.getCompanyById);
routes.post('/', companiesController.createCompany);
routes.put('/:id', companiesController.updateCompanyById);
routes.delete('/:id', companiesController.deleteCompanyById);

module.exports = routes;