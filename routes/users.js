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

router.get("/", (req, res) => {
  const username = req.session.username;
  res.render("users", { username });
});

module.exports = router;
