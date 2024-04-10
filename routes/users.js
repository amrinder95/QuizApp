// routes/users.js
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const quizzes = require("../db/queries/quizzes");
const questions = require("../db/queries/questions");
const users = require("../db/queries/users");

router.post("/", async (req, res) => {
  console.log(req.body);
  const title = req.body["quiz-title"];
  try {
    users.getUserIdByUsername(username); // use when login is setup
    await quizzes.createQuiz(1, title); //for now hardcoding in userid
    const quizId = await quizzes.quizIdByTitle(title);
    const questionsList = req.body["question"];
    const answersList = req.body["correct-answer"];
    for (let i = 0; i < questionsList.length; i++) {
      const question = questionsList[i];
      const answer = answersList[i];
      await questions.createQuestion(quizId, question, answer);
    }
    res.render("users");
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/", (req, res) => {
  res.render("users");
});

module.exports = router;
