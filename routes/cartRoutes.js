const express = require('express')
const router = express.Router()
const { getCarts,
    getCart,
    createCart,
    updatecart,
    deleteCart,
     }= require('../controllers/cartControllers')
const authenticateToken = require('../middlewares/authenticationMiddleware')

router.get('/',authenticateToken,getCarts)
router.get('/:id',authenticateToken,getCart)
router.post('/create',authenticateToken,createCart)
router.put('/update',updatecart)
router.delete('/delete',deleteCart),
 
module.exports = router
