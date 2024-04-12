// routes/users.js
const express = require("express");
const router = express.Router();
const quizzes = require("../db/queries/quizzes");
const questions = require("../db/queries/questions");
const users = require("../db/queries/users");

router.get("/", (req, res) => {
  const username = req.session.username;
  res.render("users", { username });
});

module.exports = router;
