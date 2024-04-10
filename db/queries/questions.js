const db = require('../connection');

const questionsForQuiz = (title) => {
  return db.query('SELECT question, answer FROM questions WHERE title = $1', [title])
  .then ((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const createQuestion = (quiz_id, question, answer) => {
  return db.query('INSERT INTO questions (quiz_id, question, answer) VALUES ($1, $2, $3) RETURNING *', [quiz_id,question,answer])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const questionAnswer = (question) => {
  return db.query('SELECT answer FROM questions WHERE question = $1', [question])
  .then((data) => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const getQuestionsByQuizId = (quiz_id) => {
  return db.query('SELECT question, answer FROM questions WHERE quiz_id = $1', [quiz_id])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { questionsForQuiz, createQuestion, questionAnswer, getQuestionsByQuizId }
