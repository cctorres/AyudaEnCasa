const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const verified = jwt.verify(token, 'secret');

    console.log(verified);
    next();
}

module.exports = { authenticated };