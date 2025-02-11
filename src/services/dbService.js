const prisma = require('../config/db');

const createOne = async (modal, data) => {
	return await prisma[modal].create({ data });
};

const updateOne = async (modal, id, data) => {
	return await prisma[modal].update({
		where: { id: Number(id) },
		data: data
	});
};

const deleteOne = async (modal, id) => {
	return await prisma[modal].delete({
		where: {
			id: Number(id)
		}
	});
};

const getTasks = async (search, isCompleted, page = 1, limit = 10) => {
	const skip = (page - 1) * limit;

	return await prisma.tasks.findMany({
		where: {
			AND: [
				search ? {
					title: {
						contains: search,
						mode: 'insensitive'
					}
				} : {},
				isCompleted !== undefined ? {
					isCompleted: isCompleted === 'true'
				} : {}
			]
		},
		orderBy: {
			createdAt: 'desc'
		},
		skip,
		take: limit
	});
};

const findUnique = async (modal, email) => {
	return await prisma[modal].findUnique({ where: { email } });
};

module.exports = {
	createOne,
	updateOne,
	deleteOne,
	getTasks,
	findUnique
};