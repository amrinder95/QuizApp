const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const quizzesQueries = require("../db/queries/quizzes");

router.get("/", async (req, res) => {
  const username = req.session.username;
  try {
    const user_id = await userQueries.getUserId(username);
    const quizzes = await quizzesQueries.getQuizzesByUser(user_id);
    res.json({ quizzes });
  } catch (error) {
    console.error("Error retrieving user quizzes:", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
