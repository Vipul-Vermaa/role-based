import express from 'express'
import { createPost, deletePost, deleteUser, modifyUser, updatePost } from '../controllers/adminAndModeratorController.js'
import { isAuthenticated, isAuthorised, isAdmin } from '../middlewares/auth.js'

const router = express.Router()


// createPost
router.route('/createpost').post(isAuthenticated, isAuthorised, createPost)

// updatePost
router.route('/updatepost/:id').put(isAuthenticated, isAuthorised, updatePost)

// deletePost
router.route('/deletepost/:id').delete(isAuthenticated, isAuthorised, deletePost)

// deletePost
router.route('/deleteuser/:id').delete(isAuthenticated, isAdmin, deleteUser)

// modifyuser
router.route('/modify/:id').put(isAuthenticated, isAdmin, modifyUser)

export default router

