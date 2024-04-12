// routes/users-api-js
const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const attemptQueries = require("../db/queries/attempts");
const { getResultsByAttempt } = require("../db/queries/results");

//gets recent attempts

router.get("/", async (req, res) => {
  const username = req.session.username;
  try {
    const user_id = await userQueries.getUserId(username);
    const attempts = await attemptQueries.getRecentAttempts(user_id);
    res.json({ attempts });
  } catch (error) {
    console.error("Error retrieving user attempts:", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
