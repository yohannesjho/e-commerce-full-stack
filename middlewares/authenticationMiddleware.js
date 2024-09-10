const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY

function authenitcateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];  

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden, token invalid or expired' });
        }
        req.user = user; 
        next();  
    });
}

module.exports = authenitcateToken
