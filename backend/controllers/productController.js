const Products = require("../models/productModel");

//Create product
exports.createProduct = async (req, res) => {

    const product = await Products.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}


exports.getAllProducts = (req, res) => {
    res.status(200).json({ message: "Route is working fine" });
}