import { User } from '../models/userModel.js'
import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'
import { sendToken } from '../utils/sendToken.js'
import { Post } from '../models/postModel.js'

// register
export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) return next(new ErrorHandler('Enter all fields', 400))
    let user = await User.findOne({ email })
    if (user) return next(new ErrorHandler('User already exist'), 409)
    const allowedRoles = ['admin', 'moderator', 'user']
    const userRole = role && allowedRoles.includes(role) ? role : 'user';
    user = await User.create({
        name, email, password, role: userRole,
    })
    sendToken(res, user, "Registered Successfully", 201);
})

// login
export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) return next(new ErrorHandler('enter all fields', 400))
    const user = await User.findOne({ email }).select('+password')
    if (!user) return next(new ErrorHandler('Incorrect email or password', 401))
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return next(new ErrorHandler('Incorrect email or password', 401))
    sendToken(res, user, "Logged in", 201)
})

// logout
export const logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }).json({
        success: true,
        message: 'Logged out'
    })
})

// getAllPost
export const getAllPost = catchAsyncError(async (req, res, next) => {
    const post = await Post.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,
        post
    })
})