const db = require('../connection');

const questionsForQuiz = (quiz_id) => {
  return db.query('SELECT question, answer FROM questions JOIN quizzes ON quiz_id = quizzes.id WHERE quiz_id = $1', [quiz_id])
  .then ((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}

const createQuestion = (quiz_id, question, option_a, option_b, option_c, option_d, answer) => {
  return db.query('INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, answer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [quiz_id,question, option_a, option_b, option_c, option_d, answer])
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
  return db.query('SELECT question, option_a, option_b, option_c, option_d, answer FROM questions WHERE quiz_id = $1', [quiz_id])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { questionsForQuiz, createQuestion, questionAnswer, getQuestionsByQuizId }
