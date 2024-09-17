
const Category = require('../models/Category');

const cloudinary = require('../config/cloudinary')
const fs = require('fs')



const createCategories = async (req, res) => {

    try {
        const { name, description } = req.body;
        const files = req.files;

        // Check if an image file was uploaded
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }


        const imageUrls = [];
        for (let file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'categories'
            });
            imageUrls.push(result.secure_url);
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error("Failed to delete local file:", err);
                } else {
                    console.log("Successfully deleted local file:", file.path);
                }
            });
        }


        // Create a new category with the image URL from Cloudinary
        const category = new Category({
            name,
            description,
            img: imageUrls // Store multiple image URLs
        });


        const savedCategory = await category.save();

       
        res.status(201).json(savedCategory);
    } catch (error) {
        console.log("error:", error)
        res.status(500).json({ message: 'server error' })
    }
}

const getCategories = async (req, res) => {

    try {
        const categories = await Category.find({})
        res.json(categories)
    } catch (error) {
        console.log('admin error:', error)
        res.status(500).json({ message: "server error" })
    }

}

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.json(category)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const getMyCategories = async (req, res) => {

    try {
        const myCategory = await Category.find({ user: req.user.id })
        if (!myCategory) {
            res.json({ message: "category not found" })
        }
        res.json(myCategory)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const updateCategory = async (req, res) => {

    try {
       
        const { name, description } = req.body
        const files = req.files
        const category = await Category.findOne({ _id: req.params.id })
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }


        category.name = name;
        category.description = description;
        if (files) {
            const imageUrls = [];
            for (let file of files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'categories'
                });
                 
                imageUrls.push(result.secure_url);
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error("Failed to delete local file:", err);
                    } else {
                        console.log("Successfully deleted local file:", file.path);
                    }
                });
            }
            category.img = imageUrls;
        }


        const updatedCategory = await category.save()


        res.json(updatedCategory)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}


const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.user.id })
        if (!category) {
            return res.json({ message: "category not found" })
        }
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}


module.exports = {
    createCategories,
    getCategories,
    getCategoryById,
    getMyCategories,
    updateCategory,
    deleteCategory,
}