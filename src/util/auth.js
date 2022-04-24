require('dotenv').config()
const jwt = require('jsonwebtoken');

const createJWT = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
}

module.exports = { createJWT };