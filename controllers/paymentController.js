const Payment = require('../models/payment');

const createPayment = async (req, res) => {
    const { orderId, paymentMethod, amount, transactionId } = req.body;

    try {
        // Create new payment document
        const newPayment = new Payment({
            user: req.user.id,  // Use the authenticated user's ID
            order: orderId,
            paymentMethod,
            transactionId,
            amount
        });

        // Save payment to the database
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating payment' });
    }
};

const getPaymentsByUser = async (req, res) => {
    try {
        // Find payments related to the logged-in user
        const payments = await Payment.find({ user: req.user.id });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching payments' });
    }
};

module.exports = {createPayment,getPaymentsByUser}