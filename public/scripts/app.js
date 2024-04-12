// public/scripts/app.js
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
      inputs.forEach((input) => (input.value = ""));

      // Insert the new questions container after the original questions container
      questionsContainer.parentNode.insertBefore(
        newQuestionsContainer,
        addQuestionBtn
      );
    });
  }
});
