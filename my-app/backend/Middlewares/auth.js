const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    console.log("Token Token Token=========", req.headers.authorization)
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });


    console.log("=========", token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "yoursecretkey");
        req.user = decoded; // { id: user._id }
        // req.userId = decoded.id;
        console.log("Ok ok Ok")
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
