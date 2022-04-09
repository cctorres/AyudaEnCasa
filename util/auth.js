const jwt = require('jsonwebtoken');

const createJWT = (user) => {
    return jwt.sign({user}, 'secret', {
        expiresIn: '1d',
    });
}

module.exports = { createJWT };