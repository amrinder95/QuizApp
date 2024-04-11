const db = require('../connection');

const createResult = (attempt_id, score) => {
  return db.query('INSERT INTO results (attempt_id, score) VALUES ($1, $2) RETURNING *', [attempt_id, score])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getResultsByAttempt = (attempt_id) => {
  return db.query('SELECT score, attempts.date FROM results JOIN attempts on attempt_id = attempts.id WHERE attempt_id = $1', [attempt_id])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

module.exports = { createResult, getResultsByAttempt }
