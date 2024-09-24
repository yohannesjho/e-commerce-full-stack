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
    getAllProducts,
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
const upload = require('../middlewares/upload');

router.post('/signup',adminSignUp)
router.post('/signin',adminSignIn)
router.post('/register',authenticateAdmin,registerUser)
router.get('/users',authenticateAdmin, getAllUsers)
router.put('/user',authenticateAdmin, updateUser)
router.delete('/user/:id' ,authenticateAdmin,deleteUser)
router.post('/new', upload.array('imgUrls'),createProduct)
router.get('/products', authenticateAdmin,  getAllProducts)
router.put('/product/:id',authenticateAdmin,upload.array('imgUrls'),updateProduct)
router.delete('/product/:id',authenticateAdmin, deleteProduct)
router.post('/create',authenticateAdmin, upload.array('imgUrls'),createCategories)
router.get('/categories',authenticateAdmin,getCategories)
router.get('/category',authenticateAdmin, getCategoryById)
router.put('/category',authenticateAdmin, updateCategory)
router.delete('/category/:id',authenticateAdmin,deleteCategory)
router.get('/orders',authenticateAdmin,  getAllOrders)
router.get('/order',authenticateAdmin, getOrderById)
router.delete('/order/:id',authenticateAdmin,deleteOrder)
router.get('/carts',authenticateAdmin, getCarts)
router.get('/cart',authenticateAdmin, getCart)
router.delete('/cart',authenticateAdmin, deleteCart)
router.get('/payments',authenticateAdmin, getPayments)
router.delete('/payment',authenticateAdmin, deletePayments)

module.exports = router


