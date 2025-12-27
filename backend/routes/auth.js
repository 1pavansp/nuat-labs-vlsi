const express = require('express');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Mock authentication (replace with real database check)
        if (username === 'demo' && password === 'demo123') {
            const token = 'mock_jwt_token_' + Date.now();

            res.json({
                success: true,
                token,
                user: {
                    id: 1,
                    username: 'demo',
                    email: 'demo@zoicode.com',
                    role: 'user'
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // In production: hash password, save to database, send verification email
        const token = 'mock_jwt_token_' + Date.now();

        res.json({
            success: true,
            token,
            user: {
                id: Date.now(),
                username,
                email,
                role: 'user'
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

module.exports = router;
