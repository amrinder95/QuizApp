// routes/users-api-js
/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const attemptQueries = require('../db/queries/attempts');

//gets recent attempts

router.get("/", async (req, res) => {
  const username = req.session.username;
  try{
    const user_id = await userQueries.getUserId(username);
    const quizzes = attemptQueries.getRecentAttempts(user_id);
    res.json({ quizzes })
  } catch (error) {
    console.error("Error retrieving user attempts:", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
