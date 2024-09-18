const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body

    try {
        const existedEmail = await User.findOne({ email })
        if (existedEmail) {
            res.status(400).json({ message: "the email is existed" })
        }

        if (password.length < 6) {
            res.status(400).json({ message: 'the length of the password is less than 6' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            userName,
            email,
            password: hashedPassword
        })

        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        console.log(req.header)
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "invalid email or password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: 'invalid email or password' })
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1hr' })

        res.json(token)

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "server error" })
    }

}

const getProfile = async (req, res) => {
    const user = await User.findById(req.params.id)
    try {
        if (user) {
            res.json({
                id: user._id,
                name: user.userName,
                email: user.email,
                shippingAddress: user.shippingAddress
            })
        } else {
            res.json({ message: "there is no such user" })
        }
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const updateProfile = async (req, res) => {
    const { userName, email, shippingAddress } = req.body
    try {
        const updatedProfile = await User.findByIdAndUpdate(req.params.id, {
            userName,
            email,
            shippingAddress
        })
        res.json(updatedProfile)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
}