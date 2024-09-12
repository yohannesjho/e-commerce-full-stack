const express = require('express')
const router = express.Router()
const { createCategories,getCategories,getCategoryById,getMyCategories,updateCategory,deleteCategory  } = require('../controllers/categoryControllers')
const authenticateToken = require('../middlewares/authenticationMiddleware')

router.post('/create',authenticateToken,createCategories)
router.get('/admin',getCategories)
router.get('/:id',getCategoryById)
router.get('/my',authenticateToken,getMyCategories)
router.put('/update/:id',authenticateToken,updateCategory)
router.delete('/delete/:id',authenticateToken,deleteCategory)
 


module.exports = router