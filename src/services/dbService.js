const prisma = require('../config/db');

const createOne = async (modal, data) => {
	return await prisma[modal].create({ data });
};

const updateOne = async (id, data) => {
	return await prisma.tasks.update({
		where: { id: Number(id) },
		data: {
			title: data.title,
			isCompleted: data.isCompleted
		}
	});
};

const deleteOne = async (id) => {
	return await prisma.tasks.delete({
		where: {
			id: Number(id)
		}
	});
};

const getTasks = async (search, isCompleted) => {
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
		}
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