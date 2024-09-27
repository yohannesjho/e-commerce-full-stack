const express = require('express')
const router = express.Router()
const { registerUser, loginUser,getProfile, updateProfile} = require('../controllers/userController')
const authenitcateToken = require('../middlewares/authenticationMiddleware')

//register a user
router.post('/register',registerUser)

//login a user
router.post('/login' ,loginUser)

//get user profile
router.get('/profile',authenitcateToken,getProfile)

//update user profile
router.put('/profile',updateProfile)

module.exports = router