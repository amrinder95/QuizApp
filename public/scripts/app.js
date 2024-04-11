// public/scripts/app.js
// Client facing scripts here
const { questions } = require('.../db/queries/questions');
const { quizzes } = require('.../db/queries/quizzes');

// add a new question button
document.addEventListener("DOMContentLoaded", () => {
  const addQuestionBtn = document.getElementById("add-question-btn");
  const questionsContainer = document.getElementById("questions-container");
  const submitBtn = document.querySelector("button[type='submit']");

  if (addQuestionBtn && questionsContainer) {
    addQuestionBtn.addEventListener("click", () => {
      const newQuestionsContainer = questionsContainer.cloneNode(true);
      questionsContainer.parentNode.appendChild(newQuestionsContainer);
      questionsContainer.parentNode.appendChild(addQuestionBtn);
      questionsContainer.parentNode.appendChild(submitBtn);
    });
  }
});

// const questionsAndAnswers = await questions.questionsForQuiz();
// document.getElementById('quiz-form').addEventListener('submit'), function(event) {
//   event.preventDefault();

//   const selectedAnswers
// }

