const express = require('express');
const router = express.Router();
const attempts = require('../db/queries/attempts');

router.post('/', async (req, res) => {

res.redirect('/users');
})

module.exports = router;
