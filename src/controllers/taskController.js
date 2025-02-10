const dbService = require('../services/dbService');
const responseHandler = require('../utils/responseHandler');

const createTask = async (req, res) => {
	console.log("🚀 ~ createTask ~ req:", req)
	try {
		const task = await dbService.createOne('tasks', req.body)
		return responseHandler(res, 201, true, 'Task created successfully!', {
			id: task.id,
			title: task.title,
			isCompleted: task.isCompleted
		});
	} catch (error) {
		return responseHandler(res, 500, false, 'Internal server error!', null, error.message);
	}
};

const updateTask = async (req, res) => {
	const { id } = req.params;
	if (!id) return responseHandler(res, 400, false, 'Task ID is required!', null);

	try {
		const task = await dbService.updateOne(id, req.body);

		return responseHandler(res, 200, true, 'Task updated successfully!', {
			id: task.id,
			title: task.title,
			isCompleted: task.isCompleted
		});
	} catch (error) {
		if (error.code === 'P2025') {
			return responseHandler(res, 404, false, 'Task not found!', null);
		}
		return responseHandler(res, 500, false, 'Internal server error!', null, error.message);
	}
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return responseHandler(res, 400, false, 'Task Id is required!', null);
	}

	try {
		await dbService.deleteOne(id);
		return responseHandler(res, 200, true, 'Task deleted successfully!', null); 
	} catch (error) {
		return responseHandler(res, 500, false, 'Internal server error!', null, error.message);
	}
};

const getAllTasks = async (req, res) => {
	try {
		const { search, isCompleted } = req.query;

		const tasks = await dbService.getTasks(search, isCompleted);

		const groupedTasks = Object.entries(
			tasks.reduce((acc, { createdAt, updatedAt, ...task }) => {
				const dateKey = createdAt.toISOString().split('T')[0];
				acc[dateKey] = acc[dateKey] || [];
				acc[dateKey].push(task);
				return acc;
			}, {})
		).map(([date, tasks]) => ({ date, tasks }));

		return responseHandler(res, 200, true, 'All tasks retrieved successfully!', groupedTasks);
	} catch (error) {
		return responseHandler(res, 500, false, 'Internal server error!', null, error.message);
	}
};

module.exports = {
	createTask,
	updateTask,
	deleteTask,
	getAllTasks
};