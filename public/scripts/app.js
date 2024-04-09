// public/scripts/app.js
// Client facing scripts here

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

  const quizContainer = document.getElementById("quiz-container");
  if (quizContainer) {
    fetch("/api/quizzes")
      .then((response) => response.json())
      .then((quizzes) => {
        quizzes.forEach((quiz) => {
          const quizElement = document.createElement("div");
          quizElement.textContent = quiz.title; // Assuming 'title' is a property of each quiz
          quizContainer.appendChild(quizElement);
        });
      })
      .catch((error) => console.error("Error fetching quizzes:", error));
  }
});