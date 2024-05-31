const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ error: "Authorization header not found" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: "Token not found" });
        }

        let userId;
        try {
            userId = await jwtProvider.getUserIdFromToken(token);
        } catch (err) {
            return res.status(401).send({ error: "Invalid token" });
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = authenticate;