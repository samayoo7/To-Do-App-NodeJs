const jwt = require('jsonwebtoken');
const responseHandler = require('../utils/responseHandler');

const authenticate = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log("🚀 ~ authenticate ~ authHeader:", authHeader)

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return responseHandler(res, 401, false, 'Unauthorized! No token provided!');
	}

	const token = authHeader.split(' ')[1];

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return responseHandler(res, 403, false, 'Invalid or expired token!', null, err.message);
		}

		req.user = decoded;
		next();
	});
};

module.exports = authenticate;