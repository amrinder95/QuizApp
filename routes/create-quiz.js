// routes/create-quiz.js
const express = require("express");
const router = express.Router();
const quizzes = require("../db/queries/quizzes");
const questions = require("../db/queries/questions");
const users = require("../db/queries/users");

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
      "correct-answer": correctAnswers,
    } = req.body;

    console.log("Received request to create quiz with username:", username);

    const [user] = await users.getUserIdByUsername(username);
    console.log("Retrieved user:", user);

    if (!user) {
      throw new Error("User not found");
    }
    const userId = user.id;
    console.log("UserID:", userId);

    await quizzes.createQuiz(userId, title);
    const quizId = await quizzes.quizIdByTitle(title);

    for (let i = 0; i < question.length; i++) {
      await questions.createQuestion(quizId, question[i], correctAnswers[i]);
    }

    const allQuizzes = await quizzes.getQuizzes();
    
    res.render("index", { quizzes: allQuizzes});
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
