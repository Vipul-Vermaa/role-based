import express from 'express'
import { signUpSchema, validate } from '../models/userModel.js'
import { getAllPost, login, logout, register } from '../controllers/userController.js'
import { isAuthenticated } from '../middlewares/auth.js'


const router = express.Router()

// register
router.route('/register').post(validate(signUpSchema), register)

// login
router.route('/login').post(login)

// logout
router.route('/logout').get(logout)

// getAllPost
router.route('/allpost').get(isAuthenticated, getAllPost)

export default router