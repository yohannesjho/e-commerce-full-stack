const express = require('express')
const multer = require('multer');
const Product = require('../models/product')
const router = express.Router()
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productControllers')

const storage = multer.memoryStorage(); // You can configure other storage options like diskStorage
const upload = multer({ storage });

//get all products
router.get('/',getProducts)

//get a specific product 
router.get('/:id',getProduct )

//create a new product
router.post('/new',upload.array('imgUrls'),createProduct)

router.put('/:id',updateProduct)

router.delete('/:id',deleteProduct )

module.exports = router