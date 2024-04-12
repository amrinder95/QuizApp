// public/scripts/users.js
// Client facing scripts here
$(document).ready(() => {
  $.ajax({
    method: "GET",
    url: "/api/users",
  })
    .done((response) => {
      const $attemptsList = $("#attempts");
      $attemptsList.empty();
      if (response.attempts) {
        for (const attempt of response.attempts) {
          const { id, title, date } = attempt;
          const formattedDate = new Date(date).toLocaleDateString();
          const $attemptItem = $(
            `<a href="attempts/${id}" class="attempt">`
          ).appendTo($attemptsList);
          $attemptItem.text(`${title} - Date: ${formattedDate}`);
        }
      } else {
        console.error("No attempts found in the response");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error fetching attempts:", error);
    });

  $.ajax({
    method: "GET",
    url: "/api/myquizzes",
  })
    .done((response) => {
      const $quizzesList = $("#myquizzes");
      if (response.quizzes) {
        for (const quiz of response.quizzes) {
          const { title, is_public } = quiz;
          const $quizItem = $(`<li class="quiz">`).appendTo($quizzesList);
          $quizItem.text(`${title} - Available to public: ${is_public}`);
        }
      } else {
        console.error("No quizzes found in the response");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error fetching quizzes:", error);
    });
});
