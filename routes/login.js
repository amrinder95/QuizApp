// routes/login.js
const express = require("express");
const router = express.Router();
const usersQueries = require("../db/queries/users")

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await usersQueries.getUserIdByUsername(username);

    if (!user || user.password !== password) {
      return res.render("login",
       { error: "Invalid username or password"});
    }

    req.session.userId = user.id;

    res.redirect("/");
  } catch (error) {
    console.error("Error loggin in user:", error);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
