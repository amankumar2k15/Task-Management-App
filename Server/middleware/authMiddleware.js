const jwt = require("jsonwebtoken");
const { error } = require("../helper/baseResponse");
require("dotenv").config()

const verifyToken = (req, res, next) => {
    const usertoken = req.headers.authorization;

    if (!usertoken) return res.status(401).json(error("Please authenticate using a token", 401))

    try {
        const JWT_Token = usertoken.split(" ")[1];
        const data = jwt.verify(JWT_Token, process.env.JWT_SECRET_KEY)
        // console.log(data)
        req.user = { userId: data.userId.toString() }
        next()
    } catch (err) {
        res.status(500).json(error("Invalid token", 500))
    }
}

module.exports = verifyToken
