// db/queries/quizzes.js
const db = require("../connection");

const createQuiz = (user_id, title, unique_id) => {
  return db
    .query(
      "INSERT INTO quizzes (user_id, title, unique_id) VALUES ($1, $2, $3) RETURNING *",
      [user_id, title, unique_id]
    )
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getQuizzes = () => {
  return db
    .query("SELECT * FROM quizzes")
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getQuizzesByTitle = (title) => {
  return db
    .query("SELECT * FROM quizzes WHERE title = $1", [title])
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getQuizzesByUser = (user_id) => {
  return db
    .query(`SELECT * FROM quizzes WHERE user_id = $1`, [user_id])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const hideQuiz = (title) => {
  return db
    .query(
      "UPDATE quizzes SET is_public = false WHERE title = $1 RETURNING *",
      [title]
    )
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const quizIdByTitle = (title) => {
  return db
    .query("SELECT id FROM quizzes WHERE title = $1", [title])
    .then((data) => {
      return data.rows[0].id;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getQuizById = (quizId) => {
  return db
    .query("SELECT * FROM quizzes WHERE id = $1", [quizId])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.error("Error fetching quiz by ID:", err);
      throw err;
    });
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizzesByTitle,
  getQuizzesByUser,
  hideQuiz,
  quizIdByTitle,
  getQuizById,
};
