// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, username? }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = { protect };
