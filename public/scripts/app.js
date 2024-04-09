// public/scripts/app.js
// Client facing scripts here

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/quizzes')
        .then(response => response.json())
        .then(quizzes => {
            const quizContainer = document.getElementById('quiz-container');
            quizzes.forEach(quiz => {
                const quizElement = document.createElement('div');
                quizElement.textContent = quiz.title; // Assuming 'title' is a property of each quiz
                quizContainer.appendChild(quizElement);
            });
        })
        .catch(error => console.error('Error fetching quizzes:', error));
});

const addQuestionBtn = document.getElementById('add-question-btn');
const questionsContainer = document.getElementById('questions-container');
addQuestionBtn.addEventListener('click', () => {
  const newQuestionDiv = document.createElement('div');
  newQuestionDiv.innerHTML =`
  <label for="question" class="question-title">Question:</label>
  <input type="text" name="question"><br>
  <label for="question--A" class="question-label">Answer A:</label>
  <input type="text" name="question-A"><br>
  <label for="question-B" class="question-label">Answer B:</label>
  <input type="text" name="question-B"><br>
  <label for="question-C" class="question-label">Answer C:</label>
  <input type="text" name="question-C"><br>
  <label for="question-D" class="question-label">Answer D:</label>
  <input type="text" name="question-D"><br>
  <label for="question-answer">Correct Answer:</label>
  <select name="correct-answer" id="question-answer">
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
    <option value="D">D</option>
  </select>
  `;
  questionsContainer.appendChild(newQuestionDiv);
})
