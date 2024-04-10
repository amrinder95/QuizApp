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

router.get("/", async (req, res) => {
  // const username = req.session.username;
  // const user_id = await userQueries.getUserIdByUsername(username);
  attemptQueries
    .getRecentAttempts(1)
    .then((attempts) => {
      res.json({ attempts });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
