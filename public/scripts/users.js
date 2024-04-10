// public/scripts/users.js
// Client facing scripts here
$(() => {
  $('#fetch-attempts').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
    .done((response) => {
      console.log("Response:")
      console.log(response);
      const $attemptsList = $('#attempts');
      $attemptsList.empty();

      if (response.attempts) {
        for(const attempt of response.attempts) {
          const { title, date} = attempt;
          const formattedDate = new Date(date).toLocaleDateString();
          const $attemptItem = $(`<li class="attempt">`).appendTo($attemptsList);
          $attemptItem.text(`${title} - Date: ${formattedDate}`);
        }
      } else {
        console.error('No attempts found in the response');
      }
    })
    .fail((xhr, status, error) => {
      console. error('Error fetching attempts:', error)
    });
  });
});
