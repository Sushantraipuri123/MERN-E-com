const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Unauthorized token - No token provided" });
    }

    const jwtToken = token.replace('Bearer ', "").trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log("Verified token payload:", isVerified);

        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
        console.log("User data found:", userData);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).json({ message: "Unauthorized token - Token verification failed" });
    }
};

module.exports = authMiddleware;