const Category = require('../models/category')

const createCategories = async (req, res) => {
    try {
        const { name, description, img } = req.body
        const category = new Category({user:req.user.id, name, description, img })
        const newCategory = await category.save()
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}

const getCategories = async (req, res) => {

    try {
        const categories = await Category.find({})
        res.json(categories)
    } catch (error) {
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
        const { name, description, img } = req.body
        const category = await Category.findOne({ _id: req.params.id, user: req.user.id })
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name = name;
        category.description = description;
        category.img = img;

        const updatedCategory= await category.save()
       

        res.json(updatedCategory)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}
const updateCategoryForAdmin = async (req, res) => {

    try {
        const { name, description, img } = req.body
        const category = await Category.findOneAndUpdate({ _id: req.params.id },{name,description,img},{ new: true, runValidators: true })
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(404).json({ message: "Category not found" });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const deleteCategory = async (req, res) => {
    try {
      const category = await Category.findOneAndDelete({_id:req.params.id, user:req.user.id})
      if(!category){
        return res.json({message:"category not found"})
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}
const deleteCategoryForAdmin = async (req, res) => {
    try {
      const category = await Category.findOneAndDelete({_id:req.params.id})
      if(!category){
        return res.json({message:"category not found"})
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
    updateCategoryForAdmin,
    deleteCategory,
    deleteCategoryForAdmin
}