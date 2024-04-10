// routes/register.js
const express = require("express");
const router = express.Router();
const usersQueries = require("../db/queries/users");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body; 
    const newUser = await usersQueries.createUser(username, password);
    
    if (newUser.error) {
      res.render("register", { error: newUser.error });
    } else {
    console.log("New user:", newUser); // for testing REMOVE LATER
    res.redirect("/login");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error!");
  }
});


module.exports = router;
