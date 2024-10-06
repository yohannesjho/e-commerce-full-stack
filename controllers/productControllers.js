const Product = require('../models/product')

const getProducts = async (req, res) => {
    try {
        const {category,brand,search}=req.query
        filters = {}
        if(category){
            filters.category = category
        }
        if(brand){
            filters.brand = brand
        }
        if(search){
            filters.name = { $regex: search, $options: 'i' };
        }
        const products = await Product.find(filters)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })

    }

}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, countInStock } = req.body;
        const images = req.files;
        const product = new Product({
            name,
            description,
            price,
            category,
            imgUrl: images.map(file => file.originalname),
            countInStock
        });
       

         
        const savedProduct = await product.save();

         
        res.status(201).json(savedProduct); 

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // { new: true } to return the updated document
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}