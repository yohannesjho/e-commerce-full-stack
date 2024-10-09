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
            return res.status(400).json({ message: "the email is existed" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'the length of the password is less than 6' })
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
    const { email, password } = req.body;

    try {
       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

         
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        
        const token = jwt.sign(
            { id: user._id, isAdmin:false },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }  
        );

        
        res.status(200).json({token});

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Server error" });
    }
}



const getProfile = async (req, res) => {
    try {
        console.log(req.user.id)
        const user = await User.findById(req.user.id);  

        if (user) {
            // Return success response with user details
            return res.status(200).json({
                id: user._id,
                name: user.userName,
                email: user.email,
                shippingAddress: user.shippingAddress,
            });
        } else {
            // Return 404 if user not found
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // Return 500 for server errors
        return res.status(500).json({ message: "Server error" });
    }
};


const updateProfile = async (req, res) => {
    const { userName, email, shippingAddress } = req.body
    
    try {
        const updatedProfile = await User.findByIdAndUpdate(req.user.id, {
            userName,
            email,
            shippingAddress
        },
        { new: true })
        return res.json(updatedProfile)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'server error' })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
}