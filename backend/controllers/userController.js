import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

const register = async (req, res) => {
    const { email } = req.body

    // Register duplicate
    const userExist = await User.findOne({ email })
    if (userExist) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ message: error.message })
    }

    try {
        const user = new User(req.body)
        user.token = generateId()
        const userStorage = await user.save()
        res.json({ message: "Usuario creado correctamente", user: userStorage })
    } catch (error) {
        console.log(error);
    }
}

const auth = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({ message: error.message })
    }

    if (!user.confirm) {
        const error = new Error("Tu cuenta no ha sido confirmada")
        return res.status(403).json({ message: error.message })
    }

    if (await user.checkPassword(password)) {
        res.json({ _id: user._id, name: user.name, email: user.email, token: generateJWT(user._id) })
    } else {
        const error = new Error("La contrasena es incorrecta")
        return res.status(403).json({ message: error.message })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({ token })

    if (!user) {
        const error = new Error("Token no valido")
        return res.status(404).json({ message: error.message })
    }

    try {
        user.confirm = true
        user.token = ''
        await user.save()
        res.json({ message: "Usuario confirmado correctamente" })
    } catch (error) {
        console.log(error);
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({ message: error.message })
    }

    try {
        user.token = generateId()
        await user.save()
        res.json({ message: "Hemos enviado un email con las instrucciones" })
    } catch (error) {
        console.log(error);
    }
}

const checkPassword = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({ token })

    if (!user) {
        const error = new Error("Token no valido")
        return res.status(404).json({ message: error.message })
    } else {
        res.json({ message: "Token valido y el usuario existe" })
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })

    if (!user) {
        const error = new Error("Token no valido")
        return res.status(404).json({ message: error.message })
    } else {
        user.password = password
        user.token = ''
        try {
            await user.save()
            res.json({ message: "Contrasena modificada correctamente" })
        } catch (error) {
            console.log(error);
        }
    }

}

const profile = async (req, res) => {
    const { user } = req
    res.json(user)
}

export { register, auth, confirm, forgotPassword, checkPassword, newPassword, profile };