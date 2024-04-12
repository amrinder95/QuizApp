const express = require("express");
const router = express.Router();
const { getQuizzes } = require("../db/queries/quizzes");

router.get("/", async (req, res) => {
  try {
    const quizzes = await getQuizzes();

    res.render("/", { quizzes, user: req.session.username });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
