const routes = require('express').Router();
const companies = require('../controllers/companyController');

routes.get('/', companies.getAllCompanies);
routes.get('/:company_id', companies.getCompanyById);

routes.post('/', companies.createCompany);

module.exports = routes;