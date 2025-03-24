// results scripts here
$(document).ready(function () {
  const loadResults = function () {
    const url_key = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    $.ajax({
      url: `/quizzes/api/results/${url_key}`, // the endpoint to fetch data from
      type: "GET",
      dataType: "json", // the expected response type
      success: function (response) {
        $("#title").text(response.results.title);
        $("#name").text(response.results.name);
        $("#correct-answers").text(response.results.correct_answers);
        $("#total-questions").text(response.results.total_questions);
      },
      error: function (status, error) {
        console.log("Error:", error);
      },
    });
  };
  loadResults();
});
