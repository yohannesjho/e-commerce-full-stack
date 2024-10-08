const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
 
 const authHeader = req.header('Authorization');

  
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.isAdmin !== true) {
      return res.status(403).json({ message: 'You are not authorized' });
    }
    req.admin = verified;
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateAdmin;
