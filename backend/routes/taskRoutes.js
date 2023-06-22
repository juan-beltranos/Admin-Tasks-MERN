import express from 'express';
import { postTask, getTask, updateTask, deleteTask, changeStateTask } from '../controllers/taskController.js';

import checkAuth from '../middleware/checkAuth.js';

const router = express.Router()

router.post('/', checkAuth, postTask)
router.route('/:id').get(checkAuth, getTask).put(checkAuth, updateTask).delete(checkAuth, deleteTask)
router.post('/state/:id', checkAuth, changeStateTask)

export default router;