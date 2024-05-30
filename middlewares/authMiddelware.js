const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split("Bearer ")[1]; // Changed to Bearer
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Auth failed", // Changed to failed
                    success: false,
                });
            } else {
                req.userId = decoded.id; // Set userId in req object
                next();
            }
        });
    } catch (error) {
        return res.status(401).send({
            message: "Auth failed", // Changed to failed
            success: false,
        });
    }
}
