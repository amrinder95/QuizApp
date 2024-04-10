const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const quizzesQueries = require('../db/queries/quizzes');

router.get("/", async (req, res) => {
  const username = req.session.username;
  try {
    // Get user_id using username
    const user_id = await userQueries.getUserId(username);
    // Use user_id to retrieve user quizzes
    const quizzes = await quizzesQueries.getQuizzesByUser(user_id);
    res.json({ quizzes });
  } catch (error) {
    console.error("Error retrieving user quizzes:", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
