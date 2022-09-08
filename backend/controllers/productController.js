const Products = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create product - ADMIN
exports.createProduct = catchAsyncErrors(async (req, res) => {

    const product = await Products.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

//Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;

    const apiFeature = new ApiFeatures(Products.find(), req.query)
        .search().filter()
        .pagination(resultPerPage);

    const product = await apiFeature.query;

    res.status(200).json({
        success: true,
        product
    });
});

//Get Product Details (single product info)
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Products.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});


//Update product - ADMIN
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Products.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found!"
        });
    }

    product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
});

//Delete Product - ADMIN
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Products.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    });
});