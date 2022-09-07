const Products = require("../models/productModel");

//Create product - ADMIN
exports.createProduct = async (req, res) => {

    const product = await Products.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

//Get all products
exports.getAllProducts = async (req, res) => {

    const products = await Products.find();

    res.status(200).json({
        success: true,
        products
        // message: "Route is working fine" 
    });
}

//Get Product Details (single product info)
exports.getProductDetails = async (req, res, next) => {

    const product = await Products.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found!"
        })
    }

    res.status(200).json({
        success: true,
        product
    })
}


//Update product - ADMIN
exports.updateProduct = async (req, res, next) => {

    let product = await Products.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found!"
        })
    }

    product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

//Delete Product - ADMIN

exports.deleteProduct = async (req, res, next) => {

    const product = await Products.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found!"
        })
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
}