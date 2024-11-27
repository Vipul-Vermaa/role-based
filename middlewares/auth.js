import jwt from 'jsonwebtoken'
import { catchAsyncError } from './catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'
import { User } from '../models/userModel.js'

// for authentication
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) return next(new ErrorHandler('Not Looged In', 401))
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded._id)
    next()
})

// for admin and moderator both
export const isAuthorised = catchAsyncError(async (req, res, next) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'moderator')) {
        return next(new ErrorHandler('Denied', 403));
    }
    next()
})

// for admin only
export const isAdmin = catchAsyncError(async (req, res, next) => {
    if (req.user.role !== 'admin') return next(new ErrorHandler('Denied', 403))
    next()
})

