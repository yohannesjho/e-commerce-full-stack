const express = require('express')
const router = express.Router()
const { createOrder, getOrderById, getMyOrders, updateOrder } = require('../controllers/orderControllers')
const authenticateToken = require('../middlewares/authenticationMiddleware')


router.post('/create',authenticateToken, createOrder)

router.get('/:id',getOrderById)

router.get('/',authenticateToken , getMyOrders);

router.put('/updateOrder',updateOrder)

module.exports = router