const Cart = require('../models/cart')

//get cart 
const getCarts = async (req, res) => {

    try {
        const cart = await Cart.find({ user: req.user.id })
        if (!cart) {
            return res.json({ message: "cart not found" })
        }
        res.json(cart)
    } catch (error) {

        res.status(500).json({ message: 'server error' })
    }
}

//get cart for  using id
const getCart = async (req, res) => {

    try {
        const cart = await Cart.findOne({ user: req.user.id, _id: req.params.id })
        if (!cart) {
            return res.json({ message: "cart not found" })
        }
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}

//create cart
const createCart = async (req, res) => {

    try {
        const { cartItems, totalPrice } = req.body
        const newCart = new Cart({ user: req.user.id, cartItems, totalPrice })
        const savedCart = await newCart.save()
        res.json(savedCart)
    } catch (error) {
        console.log("create error:", error)
        res.status(500).json({ message: 'server error' })
    }

}

//update cart
const updatecart = async (req, res) => {
    const { cartItems, totalPrice } = req.body
    try {
        const updatedCart = await Cart.findOneAndUpdate({ user: req.user.id, _id: req.params.id }, { cartItems, totalPrice })
        if (!updatedCart) {
            return res.json({ message: "cart not found" })
        }
        res.json(updatedCart)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}

//delete cart
const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ user: req.user.id, _id: req.params.id })
        if (!cart) {
            return res.json({ message: "cart not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}


module.exports = {
    getCarts,
    getCart,
    createCart,
    updatecart,
    deleteCart,
}
