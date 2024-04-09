// routes/login.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const usersQueries = require("../db/queries/users");

router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await usersQueries.getUserIdByUsername(username);

    if (!user) {
      return res.render("login", { error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render("login", { error: "Invalid username or password" });
    }

    req.session.userId = user.id;
    req.session.username = username;

    res.redirect("/");
  } catch (error) {
    console.error("Error loggin in user:", error);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
