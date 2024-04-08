// routes/quizzes-api.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Corrected route path to '/quizzes'
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM quizzes'); // select all quizzes
        res.json(result.rows); // quiz data as json
    } catch (err) {
        console.error('Error fetching quizzes:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;