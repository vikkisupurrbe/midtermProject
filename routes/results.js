// Results & Score Sharing - Ale
// View my results
// Share my results

/* Remember to create your feature branch before starting
  git command:
  ~ git checkout -b feature/quiz-results-ale
    (create and switch to a new branch)
  ~ git branch
    (gives feature/quiz-results-ale)
  ~ git push origin feature/quiz-results-ale
*/

const express = require('express');
const router  = express.Router();


router.post("/results", (req, res) => {
  return res.redirect("quizzes");
});


router.get("/results/:url_key", (req, res) => {

  res.render('results');
});


module.exports = router;
