// routes/quiz.js

const express = require('express');
const router = express.Router();
const { getQuizById } = require('../db/queries/quizzes');
const { getQuestionsByQuizId } = require('../db/queries/questions')

router.get('/quiz/:id', async (req, res) => {
    const id = req.params.id;
    const username = req.session.username;
    try {
        const quiz = await getQuizById(id);
        const questions = await getQuestionsByQuizId(id);

        res.render('quiz', { quiz, questions, username });
    } catch (error) {
        console.error('Error fetching quiz by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
