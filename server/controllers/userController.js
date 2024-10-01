const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// * @desc    Register new user
// * @route   POST /api/users/signup
const signup = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        email,
        password: hashedPassword,
    });

    if (user) {
        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d', // Token expires in 30 days
        });

        return res.status(201).json({
            _id: user._id,
            email: user.email,
            token,
        });
    } else {
        return res.status(400).json({ error: 'Invalid user data' });
    }
});


// * @desc    Authenticate user & get token
// * @route   POST /api/users/login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Check for user email in the database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d', // Token expires in 30 days
        });

        return res.status(200).json({
            _id: user._id,
            email: user.email,
            token,
        });
    } else {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
});

module.exports = { signup, login };