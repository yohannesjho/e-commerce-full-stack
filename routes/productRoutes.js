const express = require('express')
const Product = require('../models/product')
const router = express.Router()
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productControllers')

//get all products
router.get('/',getProducts)

//get a specific product 
router.get('/:id',getProduct )

//create a new product
router.post('/new',createProduct)

router.put('/:id',updateProduct)

router.delete('/:id',deleteProduct )

module.exports = router