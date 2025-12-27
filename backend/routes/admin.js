const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

// Get admin stats
router.get('/stats', async (req, res) => {
    res.json({
        totalProblems: 18,
        totalUsers: 1247,
        totalSubmissions: 8932,
        acceptanceRate: 67
    });
});

// Problem management routes would go here
router.post('/problems', async (req, res) => {
    res.json({ success: true, message: 'Problem created' });
});

router.put('/problems/:id', async (req, res) => {
    res.json({ success: true, message: 'Problem updated' });
});

router.delete('/problems/:id', async (req, res) => {
    res.json({ success: true, message: 'Problem deleted' });
});

module.exports = router;
