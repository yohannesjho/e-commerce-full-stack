const express = require('express')
const router = express.Router()
const { createCategories,getCategories,getCategoryById,getMyCategories,updateCategory,deleteCategory  } = require('../controllers/categoryControllers')
const authenticateToken = require('../middlewares/authenticationMiddleware')
const upload = require('../middlewares/upload');

router.post('/create',upload.array('images'),createCategories)
router.get('/',getCategories)
router.get('/:id',getCategoryById)
router.get('/my',authenticateToken,getMyCategories)
router.put('/update/:id',upload.array('images'),updateCategory)
router.delete('/delete/:id',authenticateToken,deleteCategory)
 


module.exports = router