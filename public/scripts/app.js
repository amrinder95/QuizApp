// public/scripts/app.js
// Client facing scripts here
//import { questionsForQuiz } from '../db/queries/questions';

// add a new question button
document.addEventListener("DOMContentLoaded", () => {
  const addQuestionBtn = document.getElementById("add-question-btn");
  const questionsContainer = document.getElementById("questions-container");
  const submitBtn = document.querySelector("button[id='submit-btn']");

  if (addQuestionBtn && questionsContainer) {
    addQuestionBtn.addEventListener("click", () => {
      const newQuestionsContainer = questionsContainer.cloneNode(true);
      questionsContainer.parentNode.appendChild(newQuestionsContainer);
      questionsContainer.parentNode.appendChild(addQuestionBtn);
      questionsContainer.parentNode.appendChild(submitBtn);
    });
  }
});

document.getElementById('quiz-form').addEventListener('submit', async function(event) {
  event.preventDefault();

try {
  const questions = await questionsForQuiz();
  console.log(questions);
} catch (error) {
  console.error('Error fetching questions:', error);
}
});

 /*const questionsAndAnswers = await questions.questionsForQuiz();
 document.getElementById('quiz-form').addEventListener('submit'), function(event) {
   event.preventDefault();

   const selectedAnswers
 }*/

