import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password -confirm -token -createdAt -updatedAt -__v")
            return next()
        } catch (error) {
            console.log(error);
            return res.status(404).json({ message: "Hubo un error" })
        }
    };

    if (!token) {
        const error = new Error("Token no valido")
        return res.status(404).json({ message: error.message })
    }

    next()

}

export default checkAuth