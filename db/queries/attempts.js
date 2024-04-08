const db = require('../connection');

const createAttempt = (quiz_id, user_id) => {
  return db.query('INSERT INTO attempts (quiz_id, user_id) VALUES ($1, $2) RETURNING *',[quiz_id, user_id])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getAllAttemptsByUserId = (user_id) => {
  return db.query('SELECT * FROM attempts WHERE user_id = $1',[user_id])
  .then((data) => {
    console.log(data.rows);
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getAttemptsByDate = (user_id, date) => {
  return db.query('SELECT * FROM attempts WHERE user_id = $1 AND date = $2', [user_id, date])
  .then((data) => {
    console.log(data.rows);
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}
module.exports = { createAttempt, getAllAttemptsByUserId, getAttemptsByDate }
