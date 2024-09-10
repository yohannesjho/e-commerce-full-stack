const express = require('express')
const router = express.Router()
const { createOrder, getOrderById, getMyOrders, getAllOrders, updateOrder } = require('../controllers/orderControllers')
const authenitcateToken = require('../middlewares/authenticationMiddleware')


router.post('/create',authenitcateToken, createOrder)

router.get('/:id',getOrderById)

router.get('/myorder',authenitcateToken,getMyOrders)

router.get('/',getAllOrders)

router.put('/updateOrder',updateOrder)

module.exports = router