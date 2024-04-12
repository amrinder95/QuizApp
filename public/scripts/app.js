// public/scripts/app.js
// Client facing scripts here
//import { questionsForQuiz } from '../db/queries/questions';

// add a new question button
/*document.addEventListener("DOMContentLoaded", () => {
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

// document.getElementById('quiz-form').addEventListener('submit', async function(event) {
//   event.preventDefault();

// try {
//   const questions = await questionsForQuiz();
//   console.log(questions);
// } catch (error) {
//   console.error('Error fetching questions:', error);
// }
// });

 document.addEventListener("DOMContentLoaded", () => {
  const addQuestionBtn = document.getElementById("add-question-btn");
  const questionsContainer = document.getElementById("questions-container");

  if (addQuestionBtn && questionsContainer) {
    addQuestionBtn.addEventListener("click", () => {
      // Clone the original questions container
      const newQuestionsContainer = questionsContainer.cloneNode(true);

      // Find the last question box in the new container
      const lastQuestionBox = newQuestionsContainer.lastElementChild;

      // Clear the inputs in the last question box
      const inputs = lastQuestionBox.querySelectorAll("input");
      inputs.forEach(input => input.value = '');

      // Insert the new questions container after the original questions container
      questionsContainer.parentNode.insertBefore(newQuestionsContainer, addQuestionBtn);
    });
  }
});

