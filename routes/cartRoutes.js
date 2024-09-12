const express = require('express')
const router = express.Router()
const { getCarts,
    getCart,
    getCartsAdmin,
    getCartAdmin,
    createCart,
    updatecart,
    deleteCart,
    deleteCartAdmin,}= require('../controllers/cartControllers')
const authenticateToken = require('../middlewares/authenticationMiddleware')

router.get('/',authenticateToken,getCarts)
router.get('/:id',authenticateToken,getCart)
router.get('/admin', getCartsAdmin)
router.get('/admin/:id',getCartAdmin)
router.post('/create',authenticateToken,createCart)
router.put('/update',updatecart)
router.delete('/delete',deleteCart),
router.delete('/deleteadmin',deleteCartAdmin)

module.exports = router
