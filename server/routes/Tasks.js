const express = require('express');
const router = express.Router();
const {getTasks,createTask,updateTask,deleteTask }= require('../controllers/tasksController');

router.get('/getTasks', getTasks);
router.post('/createTask', createTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

module.exports = router;
