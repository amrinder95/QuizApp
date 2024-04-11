// routes/create-quiz.js
const express = require("express");
const router = express.Router();
const quizzes = require("../db/queries/quizzes");
const questions = require("../db/queries/questions");
const users = require("../db/queries/users");
const {generateRandomString} = require('../helpers.js');

router.get("/", (req, res) => {
  const username = req.session.username;
  res.render("create-quiz", { username: username});
});

router.post("/", async (req, res) => {
  try {
    const {
      username,
      "quiz-title": title,
      question,
      "question-A": option_a,
      "question-B": option_b,
      "question-C": option_c,
      "question-D": option_d,
      "correct-answer": correctAnswers,
    } = req.body;

    console.log("Received request to create quiz with username:", username);
    console.log(title, question, option_a,option_b,option_c, option_d, correctAnswers);
    const [user] = await users.getUserIdByUsername(username);
    console.log("Retrieved user:", user);

    if (!user) {
      throw new Error("User not found");
    }
    const userId = user.id;
    console.log("UserID:", userId);

    const unique_id = generateRandomString();

    await quizzes.createQuiz(userId, title, unique_id);
    const quizId = await quizzes.quizIdByTitle(title);

    if (question.length = 1) {
      await questions.createQuestion(quizId, question, option_a, option_b, option_c, option_d, correctAnswers);
    } else {
      for (let i = 0; i < question.length; i++) {
        await questions.createQuestion(quizId, question[i], option_a[i], option_b[i], option_c[i], option_d[i], correctAnswers[i]);
      }
    }

    const allQuizzes = await quizzes.getQuizzes();

    res.render("index", { quizzes: allQuizzes, username: req.session.username});
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
