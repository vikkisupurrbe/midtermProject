
$(document).ready(function() {
  // share my results button
  $('#share-results').click(function() {
    const resultsUrl = window.location.href; // get the current page URL
    navigator.clipboard.writeText(resultsUrl).then(function() {
      alert("Results link copied to clipboard!");
    }).catch(function(err) {
      console.error("Error copying results URL:", err);
    });
  });

  //share quiz button
  $('#share-quiz').click(function() {
  });
});
