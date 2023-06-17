import Project from "../models/Project.js";

const getProjects = async (req, res) => {
    const projects = await Project.find().where('creator').equals(req.user)
    res.json(projects)
}

const postProject = async (req, res) => {
    const project = new Project(req.body)
    project.creator = req.user._id
    try {
        const projectStorage = await project.save()
        res.json({ message: "Proyecto creado correctamente", project: projectStorage })
    } catch (error) {
        console.log(error);
    }
}

const getProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id);
        if (!project) {
            const error = new Error("Proyecto no encontrado")
            return res.status(400).json({ message: error.message })
        }
        if (project.creator.toString() !== req.user._id.toString()) {
            const error = new Error("Accion no valida")
            return res.status(400).json({ message: error.message })
        }
        res.json(project)
    } catch (error) {
        console.log(error);
    }
}

const putProject = async (req, res) => {
    const { id } = req.params

    const project = await Project.findById(id);
    if (!project) {
        const error = new Error("Proyecto no encontrado")
        return res.status(400).json({ message: error.message })
    }
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(400).json({ message: error.message })
    }

    project.name = req.body.name || project.name
    project.description = req.body.description || project.description
    project.deliverDate = req.body.deliverDate || project.deliverDate
    project.client = req.body.client || project.client

    try {
        const projectStorage = await project.save()
        res.json(projectStorage)
    } catch (error) {
        console.log(error);
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params

    const project = await Project.findById(id);
    if (!project) {
        const error = new Error("Proyecto no encontrado")
        return res.status(400).json({ message: error.message })
    }
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(400).json({ message: error.message })
    }

    try {
        await project.deleteOne()
        res.status(200).json({ message: 'Proyecto eliminado correctamente' })
    } catch (error) {
        console.log(error);
    }
}

const postCollaborator = async (req, res) => { }

const deleteCollaborator = async (req, res) => { }

const getTasks = async (req, res) => { }


export { getProjects, postProject, getProject, putProject, deleteProject, postCollaborator, deleteCollaborator, getTasks }