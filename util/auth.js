const jwt = require('jsonwebtoken');

const createJWT = (user) => {
    return jwt.sign({user}, 'secret', {
        expiresIn: '1h',
    });
}

module.exports = { createJWT };