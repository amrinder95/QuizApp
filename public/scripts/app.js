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