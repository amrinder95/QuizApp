// public/scripts/app.js
// Client facing scripts here

document.addEventListener("DOMContentLoaded", () => {
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