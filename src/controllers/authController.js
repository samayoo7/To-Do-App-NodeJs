const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbService = require('../services/dbService');
const responseHandler = require('../utils/responseHandler');

const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		if (!name || !email || !password) {
			return responseHandler(res, 400, false, 'All fields are required');
		}

		const user = await dbService.findUnique('users', email);
		if (user) {
			return responseHandler(res, 400, false, 'User already exists!');
		}

		const hashPass = await bcrypt.hash(password, 10);

		const newUser = await dbService.createOne('users', {
			name,
			email,
			password: hashPass
		});

		const token = jwt.sign(
			{ id: newUser.id },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		const data = {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			token
		};

		return responseHandler(res, 201, true, 'User registered successfully!', data);
	} catch (error) {
		return responseHandler(res, 500, false, 'Internal server error!', null, error.message);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return responseHandler(res, 400, false, 'All fields are required');
		}

		const user = await dbService.findUnique('users', email);
		if (!user) {
			return responseHandler(res, 401, false, 'User not found!');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return responseHandler(res, 401, false, 'Invalid credentials!');
		}

		const token = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		return responseHandler(res, 200, true, 'Login successful!', {
			id: user.id,
			name: user.name,
			email: user.email,
			token
		});
	} catch (error) {
		return responseHandler(res, 500, false, 'Internal server error!', null, error.message);
	}
};

module.exports = {
	createUser,
	login
};