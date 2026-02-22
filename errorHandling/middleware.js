// Validation error handler for express-validator
const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}

// General error handler for Express
function errorHandler(err, req, res, next) {
	console.error(err.stack);
	res.status(err.status || 500).json({
		message: err.message || 'Internal Server Error',
		error: process.env.NODE_ENV === 'production' ? {} : err
	});
}

module.exports = {
	handleValidationErrors,
	errorHandler
};
