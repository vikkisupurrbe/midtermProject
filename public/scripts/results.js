// results scripts here
$(document).ready(function() {
  const loadResults = function() {
    $.ajax({
      url: '/quizzes/api/results/:url_key', // the endpoint to fetch data from
      type: 'GET',
      dataType: 'json',   // the expected response type
      success: function(response) {
        console.log(response);
      },
      error: function(status, error) {
        console.log('Error:', error);
      }
    });
  };
  loadResults();
});
