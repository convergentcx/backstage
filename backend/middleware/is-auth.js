const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const jwtToken = header.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(jwtToken, 'long secret');
    } catch (err) {
        err.statusCode = 500;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}