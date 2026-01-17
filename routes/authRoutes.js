const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

router.post('/register', register); // Registration route 
router.post('/login', login); // Login route

// Protected route to get user info [cite: 19, 20]
router.get('/profile', protect, (req, res) => {
    res.json({ message: "User info retrieved", user: req.user }); // [cite: 21]
});

module.exports = router;