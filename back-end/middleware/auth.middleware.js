const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send("Unauthorized");
        }
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        if (!token) {
            return res.status(401).send("Unauthorized: Token missing");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log("JWT Error: ", error.message);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send("Invalid token");
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).send("Token expired");
        }
        res.status(500).send("Internal server error");
    }
}

module.exports = authMiddleware;