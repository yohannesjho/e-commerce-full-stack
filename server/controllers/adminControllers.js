const Cart = require('../models/cart')
const Category = require('../models/Category')
const Order = require('../models/order')
const Payment = require('../models/payment')
const Product = require('../models/product')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')


//admin signup
const adminSignUp = async (req, res) => {
  const { userName, email, password } = req.body

  try {
    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(400).json({ message: 'email is existed' })
    }
    if (password.length < 6) {
      res.status(400).json({ message: 'the length of the password is less than 6' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newAdmin = new User({
      userName,
      email,
      password: hashedPassword,
      isAdmin: true
    })
    const savedAdmin = await newAdmin.save()
    res.status(201).json(savedAdmin)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error" })
  }
}
const adminSignIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const admin = await User.findOne({ email })
    if (!admin) {
      return res.status(400).json({ message: "invalid credentials" })
    }
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credientials" })
    }
    const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token })

  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
}

const adminLogout = async (req, res) => {

}

//user management
//create user
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body

  try {
    const existedEmail = await User.findOne({ email })
    if (existedEmail) {
      res.status(400).json({ message: "the email is existed" })
    }

    if (password.length < 6) {
      res.status(400).json({ message: 'the length of the password is less than 6' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      userName,
      email,
      password: hashedPassword,

    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
}

//get all users
const getAllUsers = async (req, res) => {

  try {
    const user = await User.find({})
    if (!user) {

      return res.json({ message: "users not found" })
    }
    res.json(user)
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: "server error" })
  }
}

//update user
const updateUser = async (req, res) => {

  try {
    const { userName, email, shippingAddress } = req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      userName,
      email,
      shippingAddress
    })
    if (!updatedUser) {
      res.json({ message: 'user not found' })
    }
    res.json(updatedProfile)
  } catch (error) {
    res.status(500).json({ message: 'server error' })
  }
}

//delete user
const deleteUser = async (req, res) => {
  try {

    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      res.json({ message: 'user not found' })
    }
    res.json({ message: 'user deleted successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'server error' })
  }
}

//prdouct management
//create product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Array to hold Cloudinary URLs
    const imageUrls = [];

    for (let file of files) {
      try {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'products',
        });

        // Push the secure URL to imageUrls array
        imageUrls.push(result.secure_url);

        // Delete the local file after successful upload
        await fs.promises.unlink(file.path);

      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    // Create and save the product
    const product = new Product({
      name,
      description,
      price,
      category,
      countInStock,
      imgUrls: imageUrls, // Store Cloudinary URLs
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error" })

  }

}

//update product
const updateProduct = async (req, res) => {
  try {
    const { name, category, description, price, countInStock } = req.body
    const files = req.files

    const imageUrls = [];
    if (files) {

      for (let file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'product_edit'
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
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, category, description, price, countInStock,imgUrls:imageUrls });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

//delete product
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

//category management
//create category
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
      imgUrls: imageUrls // Store multiple image URLs
    });


    const savedCategory = await category.save();


    res.status(201).json(savedCategory);
  } catch (error) {
    console.log("error:", error)
    res.status(500).json({ message: 'server error' })
  }
}

//get all categories
const getCategories = async (req, res) => {

  try {
    const categories = await Category.find({})
    if (!categories) {
      return res.status(404).json({ message: "categories not found" });
    }
    res.json(categories)
  } catch (error) {

    res.status(500).json({ message: "server error" })
  }

}

//get category by id
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
}

//update category
const updateCategory = async (req, res) => {

  try {
    const { name, description} = req.body
    const files = req.files

    const imageUrls = [];
    if (files) {
     
      for (let file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'category_edit'
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
    }
    
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,         
      { name, description, imgUrls: imageUrls },  
      { new: true }          
    );
    
    if (!updatedCategory) {
      
      console.log("category updated successfully!")
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(404).json({ message: "Category not found" });
  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
}

//delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id })
    if (!category) {
      return res.json({ message: "category not found" })
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
}

//order management
//get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
    if (!orders) {
      return res.json({ message: 'order not found' })
    }
    res.json(orders)
  }

  catch (error) {
    res.status(500).json({ message: "server error" })
  }

}

//get order by id
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

//delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id })
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "order deleted successfully" })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: "server error" })
  }
}

//cart management
//get all carts
const getCarts = async (req, res) => {

  try {
    const cart = await Cart.find({})
    if (!cart) {
      return res.json({ message: "cart not found" })
    }
    res.json(cart)
  } catch (error) {

    res.status(500).json({ message: 'server error' })
  }
}

//get cart by id
const getCart = async (req, res) => {

  try {
    const cart = await Cart.find(req.params.id)
    if (!cart) {
      return res.json({ message: "cart not found" })
    }
    res.json(cart)
  } catch (error) {

    res.status(500).json({ message: 'server error' })
  }
}

//delete cart 
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ _id: req.params.id })
    if (!cart) {
      return res.json({ message: "cart not found" })
    }
    res.json({ message: "cart delted successfully" })
  } catch (error) {

    res.status(500).json({ message: 'server error' })
  }
}

//payment management
//get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    if (!payments) {
      return res.json({ message: "payments not found" })
    }
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching payments' });
  }
};

//delete payment
const deletePayments = async (req, res) => {
  try {
    const payments = await Payment.findOneAndDelete({ _id: req.params.id });
    if (!payments) {
      return res.json({ message: "payments not found" })
    }
    res.status(200).json({ message: "payment delted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching payments' });
  }
};


module.exports = {
  adminSignUp,
  adminSignIn,
  registerUser,
  getAllUsers,
  updateUser,
  deleteUser,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  createCategories,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllOrders,
  getOrderById,
  deleteOrder,
  getCarts,
  getCart,
  deleteCart,
  getPayments,
  deletePayments
}
