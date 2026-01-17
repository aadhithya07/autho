const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; // Extract token 
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token 
            req.user = decoded; // Attach user info to request [cite: 18]
            next();
        } catch (err) {
            res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        res.status(401).json({ message: "No token, authorization denied" });
    }
};