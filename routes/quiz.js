// routes/quiz.js

const express = require("express");
const router = express.Router();
const { getQuizById } = require("../db/queries/quizzes");
const { getQuestionsByQuizId } = require("../db/queries/questions");
const { createAttempt } = require("../db/queries/attempts");
const { getUserIdByUsername } = require("../db/queries/users");
const { createResult } = require("../db/queries/results");
const { questionsForQuiz } = require("../db/queries/questions");

router.get("/quiz/:id", async (req, res) => {
  const id = req.params.id;
  const username = req.session.username;
  try {
    const quiz = await getQuizById(id);
    const questions = await getQuestionsByQuizId(id);

    res.render("quiz", { quiz, questions, username });
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/quiz/:id", async (req, res) => {
  let answers = [];
  for (let questionAnswer in req.body) {
    answers.push(req.body[questionAnswer]);
  }
  let quiz_id = req.params.id;
  let score = 0;
  try {
    const questions = await getQuestionsByQuizId(quiz_id);
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].answer === answers[i]) {
        score++;
      }
    }
    const username = req.session.username;
    const user = await getUserIdByUsername(username);
    const user_id = user[0].id;
    const attemptObject = await createAttempt(quiz_id, user_id);
    const attempt = attemptObject[0].id;
    const result = await createResult(attempt, score);
  } catch (error) {
    console.error("Error submitted", error);
    res.status(500).send("Internal Server Error");
  }

  res.redirect("/users");
});

module.exports = router;
