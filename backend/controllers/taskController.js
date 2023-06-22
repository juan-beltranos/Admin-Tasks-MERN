import Project from "../models/Project.js";
import Task from "../models/Task.js";

const postTask = async (req, res) => {
    const { project } = req.body

    const projectExist = await Project.findById(project)

    if (!projectExist) {
        const error = new Error('El proyecto no existe')
        return res.status(404).json({ message: error.message })
    }

    if (projectExist.creator.toString() !== req.user._id.toString()) {
        const error = new Error('No tiene los permisos para agregar tareas')
        return res.status(403).json({ message: error.message })
    }

    try {
        const taskStorage = await Task.create(req.body);
        res.json(taskStorage)
    } catch (error) {
        console.log(error);
    }

    console.log(projectExist);
}

const getTask = async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id).populate('project')

    if (!task) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ message: error.message })
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Accion no valida')
        return res.status(403).json({ message: error.message })
    }

    res.json(task);
}

const updateTask = async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id).populate('project')

    if (!task) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ message: error.message })
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Accion no valida')
        return res.status(403).json({ message: error.message })
    }

    task.name = req.body.name || task.name
    task.description = req.body.description || task.description
    task.priority = req.body.priority || task.priority
    task.deliverDate = req.body.deliverDate || task.deliverDate

    try {
        const taskStorage = await task.save()
        res.json(taskStorage)
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params
    const task = await Task.findById(id).populate('project')

    if (!task) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ message: error.message })
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Accion no valida')
        return res.status(403).json({ message: error.message })
    }

    try {
        await task.deleteOne(task)
        res.json({ message: 'Tarea eliminada' })
    } catch (error) {
        console.log(error);
    }
}

const changeStateTask = async (req, res) => { }

export { postTask, getTask, updateTask, deleteTask, changeStateTask }