const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    //check if token is not existing
    if (!token) {
        return res.status(401).json({ msg: "No token found! Authorization denied." })
    }

    //check if token is valid or not
    try {
        const decoded = jwt.verify(token, process.env.jwtToken);
        req.user = decoded.user;
        next()
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid." })
    }
}