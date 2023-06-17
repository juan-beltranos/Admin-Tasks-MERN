import express from "express";
import { register, auth, confirm, forgotPassword, checkPassword, newPassword, profile } from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router()

router.post('/', register)
router.post('/login', auth)
router.get('/confirm/:token', confirm)
router.post('/forgotPassword', forgotPassword)
router.route('/checkPassword/:token').get(checkPassword).post(newPassword)

router.get('/profile', checkAuth, profile)

export default router;