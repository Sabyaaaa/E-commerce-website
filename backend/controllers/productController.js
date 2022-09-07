const Products = require("../models/productModel");

//Create product - Admin
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

//Update product - Admin
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