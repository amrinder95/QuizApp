// routes/create-quiz.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("create-quiz");
});

module.exports = router;
