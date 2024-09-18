const express = require('express')
const router = express.Router()
const  {
    adminSignUp,
    adminSignIn,
    registerUser,
    getAllUsers,
    updateUser,
    deleteUser,
    createProduct,
    updateProduct,
    deleteProduct,
    createCategories,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getAllOrders,
    getOrderById,
    deleteOrder,
    getCarts,
    getCart,
    deleteCart,
    getPayments,
    deletePayments
} = require('../controllers/adminControllers')
const authenticateAdmin = require('../middlewares/authenticateAdmin')

router.post('/signup',adminSignUp)
router.post('/signin',adminSignIn)
router.post('/register',registerUser)
router.get('/users',getAllUsers)
router.put('/user',updateUser)
router.delete('/user',deleteUser)
router.post('/product',createProduct)
router.put('/product',updateProduct)
router.delete('/product',deleteProduct)
router.post('/category',createCategories)
router.get('/categories',getCategories)
router.get('/category',getCategoryById)
router.put('/category',authenticateAdmin,updateCategory)
router.delete('/category',deleteCategory)
router.get('/orders',getAllOrders)
router.get('/order',getOrderById)
router.delete('/order',deleteOrder)
router.get('/carts',getCarts)
router.get('/cart',getCart)
router.delete('/cart',deleteCart)
router.get('/payments',getPayments)
router.delete('/payment',deletePayments)

module.exports = router


