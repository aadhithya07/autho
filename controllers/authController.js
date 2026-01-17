const User = require('../models/User');
const bcrypt = require('bcryptjs'); // To hash passwords [cite: 11]
const jwt = require('jsonwebtoken'); // To generate tokens [cite: 15]

// Handle User Registration [cite: 10]
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password [cite: 11]
        await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully!" }); // Success message [cite: 12]
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handle User Login [cite: 13, 14]
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // Verify credentials [cite: 14]
        if (user && await bcrypt.compare(password, user.password)) {
            // Generate JWT [cite: 15]
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token }); // Return JWT to user [cite: 16]
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};