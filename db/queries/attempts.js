// db/queries/attempts.js
const db = require('../connection');
const users = require('./users');

const createAttempt = (quiz_id, user_id) => {
  return db.query('INSERT INTO attempts (quiz_id, user_id) VALUES ($1, $2) RETURNING id',[quiz_id, user_id])
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
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getAttemptsByDate = (user_id, date) => {
  return db.query('SELECT * FROM attempts WHERE user_id = $1 AND date = $2', [user_id, date])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getQuizIdByAttempt = (attempt_id) => {
  return db.query('SELECT quiz_id FROM attempts WHERE id = $1', [attempt_id])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getUserIdByAttempt = (attempt_id) => {
  return db.query('SELECT users.username FROM attempts JOIN users ON user_id = users.id WHERE attempts.id = $1', [attempt_id])
  .then((data) => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getRecentAttempts = (user_id) => {
  return db.query(`
  SELECT attempts.id, quizzes.title, date
  FROM attempts
  JOIN quizzes ON quiz_id = quizzes.id
  WHERE attempts.user_id = $1
  GROUP BY attempts.id, quizzes.title, attempts.date
  ORDER BY attempts.date
  LIMIT 5`, [user_id])
  .then((data) => {
    return data.rows
  })
  .catch((err) => {
    console.log(err.message);
  })
}
module.exports = { createAttempt, getAllAttemptsByUserId, getAttemptsByDate, getRecentAttempts, getQuizIdByAttempt, getUserIdByAttempt }
