const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const verified = jwt.verify(token, "secret")
    } catch (error) {
        res.status(401).send({ error: "You are not authenticated" })
        next();
    }
    next();
}

module.exports = { authenticated };