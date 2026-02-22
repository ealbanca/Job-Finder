// Validation error handler for express-validator
const {body, param, validationResult} = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

//Job validation rules
const jobValidationRules ={

	getAllJobs: [
		handleValidationErrors
	],

	getJobById: [
		param('id').isMongoId().withMessage('Invalid job ID'),
		handleValidationErrors
	],
	createJob: [
		body('jobTitle').notEmpty().withMessage('Job title is required'),
		body('companyName').notEmpty().withMessage('Company name is required'),
		body('description').notEmpty().withMessage('Description is required'),
		body('yearSalary').isNumeric().withMessage('Yearly salary must be a number'),
		body('country').notEmpty().withMessage('Country is required'),
		body('state').notEmpty().withMessage('State is required'),
		body('city').notEmpty().withMessage('City is required'),
		body('remote').isBoolean().withMessage('Remote must be a boolean'),
		body('employmentType').notEmpty().withMessage('Employment type is required'),
		body('experienceLevel').notEmpty().withMessage('Experience level is required'),

		handleValidationErrors
	],

	updateJobById: [
		param('id').isMongoId().withMessage('Invalid job ID'),
		body('jobTitle').optional().notEmpty().withMessage('Job title cannot be empty'),
		body('companyName').optional().notEmpty().withMessage('Company name cannot be empty'),
		body('description').optional().notEmpty().withMessage('Description cannot be empty'),
		body('yearSalary').optional().isNumeric().withMessage('Yearly salary must be a number'),
		body('country').optional().notEmpty().withMessage('Country cannot be empty'),
		body('state').optional().notEmpty().withMessage('State cannot be empty'),
		body('city').optional().notEmpty().withMessage('City cannot be empty'),
		body('remote').optional().isBoolean().withMessage('Remote must be a boolean'),
		body('employmentType').optional().notEmpty().withMessage('Employment type cannot be empty'),
		body('experienceLevel').optional().notEmpty().withMessage('Experience level cannot be empty'),
		handleValidationErrors
	],

	deleteJobById: [
		param('id').isMongoId().withMessage('Invalid job ID'),
		handleValidationErrors
	],
};

// Company validation rules
const companyValidationRules = {
	getAllCompanies: [
		handleValidationErrors
	],
	getCompanyById: [
		param('id').isMongoId().withMessage('Invalid company ID'),
		handleValidationErrors
	],
	createCompany: [
		body('companyName').notEmpty().withMessage('Company name is required'),
		body('industry').notEmpty().withMessage('Industry is required'),
		body('companySize').isNumeric().withMessage('Company size must be a number'),	
		body('headquarters').notEmpty().withMessage('Headquarters is required'),
		body('foundedYear').isNumeric().withMessage('Founded year must be a number'),
		body('remoteFriendly').isBoolean().withMessage('Remote friendly must be a boolean'),
		handleValidationErrors
	],

	updateCompanyById: [
		param('id').isMongoId().withMessage('Invalid company ID'),
		body('companyName').optional().notEmpty().withMessage('Company name cannot be empty'),
		body('industry').optional().notEmpty().withMessage('Industry cannot be empty'),
		body('companySize').optional().isNumeric().withMessage('Company size must be a number'),
		body('headquarters').optional().notEmpty().withMessage('Headquarters cannot be empty'),
		body('foundedYear').optional().isNumeric().withMessage('Founded year must be a number'),
		body('remoteFriendly').optional().isBoolean().withMessage('Remote friendly must be a boolean'),
		handleValidationErrors
	],
		
	deleteCompanyById: [
		param('id').isMongoId().withMessage('Invalid company ID'),
		handleValidationErrors
	],
};

module.exports = {
	handleValidationErrors,
	jobValidationRules,
	companyValidationRules
}
