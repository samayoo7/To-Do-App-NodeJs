const { body } = require('express-validator');

const validateTask = [
	body('title')
		.isString()
		.withMessage('Title must be a string')
		.isLength({ min: 3 })
		.withMessage('Title must be at least 3 characters long')
];

const validateTaskUpdate = [
	body('title')
		.optional()
		.isString()
		.withMessage('Title must be a string')
		.isLength({ min: 3 })
		.withMessage('Title must be at least 3 characters long'),
	body('isCompleted')
		.optional()
		.isBoolean()
		.withMessage('Status must be a boolean')
];

module.exports = {
	validateTask,
	validateTaskUpdate
};