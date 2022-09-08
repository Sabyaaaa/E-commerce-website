const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avtar: {
            public_id: "This is a sample id",
            url: "profilePicUrl"
        }
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token
    });
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    //checking if the user has given email and password both
    if (!email || password) {
        return next(new ErrorHandler("Please Enter Email"));
    }

    const user = User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password"));
    }

    const isPasswordMatched = user.comparePassword();

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password"));
    }

    const token = user.getJWTToken();

    res.status(200).json({
        success: true,
        token
    })
})