// routes/users.js
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const quizzes = require("../db/queries/quizzes");
const questions = require("../db/queries/questions");
const users = require("../db/queries/users");


// router.post("/", async (req, res) => {
//   const username = req.body.username;
//   console.log(req.body);
//   const title = req.body["quiz-title"];
//   try {
//     users.getUserIdByUsername(username); // use when login is setup
//     await quizzes.createQuiz(1, title); //for now hardcoding in userid
//     const quizId = await quizzes.quizIdByTitle(title);
//     console.log(req.body);
//     const questionsList = req.body["question"];
//     const answersList = req.body["correct-answer"];
//     const option_aList = req.body["option_a"];
//     const option_bList = req.body["option_b"];
//     const option_cList = req.body["option_c"];
//     const option_dList = req.body["option_d"];
//     if (questionsList.length > 1) {
//       for (let i = 0; i < questionsList.length; i++) {
//         const question = questionsList[i];
//         const answer = answersList[i];
//         const option_a = option_aList[i];
//         const option_b = option_bList[i];
//         const option_c = option_cList[i];
//         const option_d = option_dList[i];
//         await questions.createQuestion(quizId, question, option_a, option_b, option_c, option_d, answer);
//       }
//     } else {
//       const question = questionsList;
//       const answer = answersList;
//       const option_a = option_aList;
//       const option_b = option_bList;
//       const option_c = option_cList[i];
//       const option_d = option_dList[i];
//       await questions.createQuestion(quizId, question, option_a, option_b, option_c, option_d, answer);
//     }

//     res.render("users");
//   } catch (error) {
//     console.log(error.message);
//   }
// });

router.get("/", (req, res) => {
  const username = req.session.username;
  res.render("users", { username });
});

module.exports = router;
