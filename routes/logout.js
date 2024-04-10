const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.status(500).send("Internal Server Error");
    }
    res.redirect('/login');
  });
});

module.exports = router;