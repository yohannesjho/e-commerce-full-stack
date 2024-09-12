const Order = require('../models/order')


const createOrder = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body
    try {
        const newOrder =   new Order({user: req.user.id, orderItems, shippingAddress, paymentMethod, totalPrice })

        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

const getMyOrders = async (req, res) => {
    try {
        console.log(req.user.id)
        const orders = await Order.find({user:req.user.id})
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }
        res.json(orders)
        
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            res.status(400).json({ message: "order not found" })
        }
        res.json(order)
    } catch (error) {
        console.log("order create error:", error)
        
    }
}
 
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            res.json({ message: "order not found" })
        }
        order.isDelivered = true
        order.deliveredAt = order.isDelivered ? Date.now() : null;
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const deleteOrder = async (req, res)=>{
    try {
        const order = Order.findOneAndDelete(req.params.id)
        if (!order) {
            res.json({ message: "order not found" })
        }
        res.json({message:"order deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

module.exports = {

    createOrder,
    getOrderById,
    getMyOrders,
    updateOrder,
    deleteOrder
}