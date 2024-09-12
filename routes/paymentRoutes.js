const express = require('express');
const router = express.Router();
const { createPayment, getPaymentsByUser } = require('../controllers/paymentController');
const authenticateToken = require('../middlewares/authenticationMiddleware');

// Route to create a new payment
router.post('/create', authenticateToken, createPayment);

// Route to get all payments by a specific user
router.get('/my-payments', authenticateToken, getPaymentsByUser);

module.exports = router;
