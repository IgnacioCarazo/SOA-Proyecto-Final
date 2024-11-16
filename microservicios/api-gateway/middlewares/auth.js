const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Ensure the secret is shared across services

// Middleware to verify the token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access Token Required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user; // Attach the decoded token (with role) to the request object
        next();
    });
};

// Middleware to authorize based on roles
const authorizeRole = (requiredRole) => (req, res, next) => {
    console.log('User in request:', req.user); 
    console.log('rq Role:', requiredRole); 
    if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    next();
};

module.exports = { authenticateToken, authorizeRole };
