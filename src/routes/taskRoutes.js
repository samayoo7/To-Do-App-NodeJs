const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middlewares/authenticate');
const { validateTask, validateTaskUpdate } = require('../middlewares/validation/taskValidation');
const { validationErrorHandler } = require('../middlewares/errorHandling');

router.post('/tasks', authenticate, validateTask, validationErrorHandler, taskController.createTask);
router.put('/tasks/:id', authenticate, validateTaskUpdate, validationErrorHandler, taskController.updateTask);
router.delete('/tasks/:id', authenticate, taskController.deleteTask);
router.get('/tasks', authenticate, taskController.getAllTasks);

module.exports = router;