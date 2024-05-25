const jwt = require("jsonwebtoken");

const SECRET_KEY = "bweibeibdiubwebfiubwfojweo";

const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
};

const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken.userId;
    } catch (error) {
        // Handle token verification errors
        throw new Error("Invalid token");
    }
};

module.exports = { generateToken, getUserIdFromToken };
