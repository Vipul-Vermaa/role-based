import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

export const signUpSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .trim()
        .min(3, { message: 'atleast 3' }),

    email: z
        .string({ message: 'Email is required' })
        .email({ message: 'Invalid email format' }),

    password: z
        .string()
        .min(6, { message: 'must be 6 or more' }),

    role: z
        .enum(['admin', 'moderator', 'user'])
        .default('user'),
})

export const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (error) {
        const message = error.errors[0].message;
        res.status(400).json({ msg: message })
    }
}

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name']
    },
    email: {
        type: String,
        required: [true, 'Enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        minLength: [6, 'must be six or more'],
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'moderator', 'user'],
        required: true,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// save password after hashing
schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// get jwt token
schema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '15d' })
}

// compare password
schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', schema)