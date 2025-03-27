$(document).ready(function() {
  const timeOut = 1500;
  // share my results button
  $('#share-results').click(function() {
    const $button = $(this);
    const originalText = $button.text();
    const copiedText = "Copied!";
    const resultsUrl = window.location.href; // get the current page URL

    $button.text(copiedText); // change the button text

    navigator.clipboard.writeText(resultsUrl)
      .then(function() {
        setTimeout(function() {
          $button.text(originalText); // revert to original text after timeout
        }, timeOut);
      })
      .catch(function(err) {
        console.error("Error copying results URL:", err);
        $button.text("Failed!"); // change to failed text
        setTimeout(function() {
          $button.text(originalText); // revert to original text after timeout
        }, timeOut);
      });
  });

  //share quiz button
  $('#share-quiz').click(function() {
    const $button = $(this);
    const originalText = $button.text();
    const copiedText = "Copied!";

    $button.text(copiedText); // change the button text

    navigator.clipboard.writeText(quizURL)
      .then(function() {
        setTimeout(function() {
          $button.text(originalText); // revert to original text after timeout
        }, timeOut);
      })
      .catch(function(err) {
        console.error("Error copying quiz URL:", err);
        $button.text("Failed!"); // change to failed text
        setTimeout(function() {
          $button.text(originalText); // revert to original text after timeout
        }, timeOut);
      });
  });
});
