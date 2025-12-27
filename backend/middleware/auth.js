const express = require('express');
const router = express.Router();

// Mock authentication middleware
function authenticate(req, res, next) {
    // In production, verify JWT token
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Mock user (in production, decode JWT and get from database)
    req.user = {
        id: 1,
        username: 'testuser',
        role: 'user'
    };

    next();
}

// Check if user is admin
function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

module.exports = { authenticate, isAdmin };
