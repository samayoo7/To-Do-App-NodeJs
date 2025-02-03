const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateTask, validateTaskUpdate } = require('../middlewares/validation/taskValidation');
const { validationErrorHandler } = require('../middlewares/errorHandling');

router.post('/tasks', validateTask, validationErrorHandler, taskController.createTask);
router.put('/tasks/:id', validateTaskUpdate, validationErrorHandler, taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks', taskController.getAllTasks);

module.exports = router;