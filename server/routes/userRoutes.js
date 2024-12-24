const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const protect = require("../middleware/authMiddleware");

router.post("/", asyncHandler(async (req, res) => {
    const { firstname, email, password } = req.body;
    if (!firstname || !email || !password) {
        res.status(400).json({ message: "Please add all fields" });
        return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        firstname: firstname,
        email: email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstname: user.firstname,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
}));

router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            firstname: user.firstname,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
}));

router.get("/me", protect, asyncHandler(async (req, res) => {
    const {_id,firstname,email} = await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        firstname,
        email
    })
}));

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = router;