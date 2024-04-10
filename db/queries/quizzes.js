const db = require('../connection');

const createQuiz =  (user_id, title) => {
  return db.query('INSERT INTO quizzes (user_id,title) VALUES ($1, $2) RETURNING *', [user_id, title])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes')
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
};

const getQuizzesByTitle = (title) => {
  return db.query('SELECT * FROM quizzes WHERE title = $1', [title])
  .then((data) => {
    console.log(data.rows);
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getQuizzesByUser = (user_id) => {
  return db.query(`SELECT * FROM quizzes WHERE user_id = $1`, [user_id])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const hideQuiz = (title) => {
  return db.query('UPDATE quizzes SET is_public = false WHERE title = $1 RETURNING *', [title])
  .then((data) => {
    console.log(data.rows);
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const quizIdByTitle = (title) => {
  return db.query('SELECT id FROM quizzes WHERE title = $1', [title])
  .then((data) => {
    return data.rows[0].id;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

module.exports = { createQuiz, getQuizzes, getQuizzesByTitle, getQuizzesByUser, hideQuiz, quizIdByTitle };
