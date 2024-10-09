const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order', 
        required: true 
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Stripe', 'Bank Transfer'],  // Add the methods you support
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],  // Payment status options
        default: 'Pending'
    },
    transactionId: { 
        type: String, 
        required: true  // Transaction ID from the payment gateway 
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
