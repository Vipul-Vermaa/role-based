import { User } from '../models/userModel.js'
import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'
import { Post } from '../models/postModel.js'

// createPost
export const createPost = catchAsyncError(async (req, res, next) => {
    const { title, description } = req.body
    if (!title || !description) return next(new ErrorHandler('Enter all fields', 400))
    const post = await Post.create({
        title, description
    })
    res.status(201).json({
        success: true,
        message: 'Post created',
        post
    })
})

// updatePost
export const updatePost = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) return next(new ErrorHandler('Not found', 404))
    const { title, description } = req.body
    if (title) post.title = title
    if (description) post.description = description
    await post.save()
    res.status(200).json({
        success: true,
        message: 'Post updated'
    })

})

// deletePost
export const deletePost = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) return next(new ErrorHandler('Not Found', 404))
    if (req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return next(new ErrorHandler('Access denied', 403));
    }
    await Post.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: 'Deleted'
    })
})

// deleteUser
export const deleteUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) return next(new ErrorHandler('not found', 404))
    if (user.role === 'admin') return next(new ErrorHandler('Cannot delete admin accounts', 403))
    if (req.user._id.toString() === id) {
        return next(new ErrorHandler('You cannot delete your own account', 403));
    }
    await user.deleteOne()
    res.status(200).json({
        success: true,
        message: 'user deleted'
    })
})

// modifying user
export const modifyUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) return next(new ErrorHandler('not found', 404))
    if (user.role === 'admin') {
        return next(new ErrorHandler('Cannot modify admin roles', 403));
    }
    if (user.role === 'moderator') {
        user.role = 'user'
    }
    else {
        user.role = 'moderator'
    }
    await user.save()
    res.status(200).json({
        success: true,
        message: 'user role updated'
    })
})