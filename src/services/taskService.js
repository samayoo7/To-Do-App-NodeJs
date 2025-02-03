const prisma = require('../config/db');

const createOne = async (taskData) => {
	return await prisma.task.create({ data: taskData });
};

const updateOne = async (id, data) => {
	return await prisma.task.update({
		where: { id: Number(id) },
		data: {
			title: data.title,
			isCompleted: data.isCompleted
		}
	});
};

const deleteOne = async (id) => {
	return await prisma.task.delete({
		where: {
			id: Number(id)
		}
	});
};

const getTasks = async (search, isCompleted) => {
	return await prisma.task.findMany({
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
}

module.exports = {
	createOne,
	updateOne,
	deleteOne,
	getTasks
};