const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'You are not logged in'
        });
    }else{
        const decoded = jwt.verify(token, 'secret');
        req.verifiedUser = decoded.user;
    }
    next();
}

module.exports = { authenticated };