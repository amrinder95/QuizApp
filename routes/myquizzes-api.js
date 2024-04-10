const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const quizzesQueries = require('../db/queries/quizzes');

router.get("/", async (req, res) => {
  // const username = req.session.username;
  // const user_id = await userQueries.getUserIdByUsername(username);
  quizzesQueries
    .getQuizzesByUser(1)
    .then((quizzes) => {
      res.json({ quizzes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
