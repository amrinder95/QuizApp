const express = require("express");
const router = express.Router();
const { getResultsByAttempt } = require("../db/queries/results");
const { getQuizIdByAttempt } = require("../db/queries/attempts");
const { getQuizById } = require("../db/queries/quizzes");
const { questionsForQuiz } = require("../db/queries/questions");
const { getUserIdByAttempt } = require("../db/queries/attempts");

router.get("/:id", async (req, res) => {
  const username = req.session.username;
  const attempt_id = req.params.id;
  try {
    const scoreObject = await getResultsByAttempt(attempt_id);
    const quizObject = await getQuizIdByAttempt(attempt_id);
    const quiz_id = quizObject[0].quiz_id;
    const score = scoreObject[0];
    const quiz = await getQuizById(quiz_id);
    const questions = await questionsForQuiz(quiz_id);
    const formattedDate = new Date(score.date).toLocaleDateString();
    const user = await getUserIdByAttempt(attempt_id);
    res.render("attempts", {
      username,
      score,
      quiz,
      questions,
      formattedDate,
      user,
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
