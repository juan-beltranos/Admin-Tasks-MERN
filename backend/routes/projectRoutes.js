import express from 'express'
import {
    getProjects,
    postProject,
    getProject,
    putProject,
    deleteProject,
    postCollaborator,
    deleteCollaborator
} from '../controllers/projectController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.route('/').get(checkAuth, getProjects).post(checkAuth, postProject)
router.route('/:id').get(checkAuth, getProject).put(checkAuth, putProject).delete(checkAuth, deleteProject)

router.post('/addCollaborator/:id', checkAuth, postCollaborator)
router.post('/addCollaborator/:id', checkAuth, deleteCollaborator)

export default router