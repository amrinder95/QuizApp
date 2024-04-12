const db = require("../connection");

const getAnswersByAttempt = (attempt_id) => {
  return db
    .query("SELECT question_id, answer FROM answers where attempt_id = $1", [
      attempt_id,
    ])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAnswerForQuestion = (attempt_id, question_id) => {
  return db
    .query(
      "SELECT answer FROM answers where attempt_id = $1 AND question_id = $2",
      [attempt_id, question_id]
    )
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = { getAnswersByAttempt, getAnswerForQuestion };
