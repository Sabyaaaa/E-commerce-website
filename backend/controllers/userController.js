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