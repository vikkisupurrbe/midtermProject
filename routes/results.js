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
const dbQuizzes = require('../db/queries/results');


router.post("/results", (req, res) => {

  return res.redirect("quizzes");
});

// Fetching results page
router.get("/results/:url_key", (req, res) => {
  const url_key = req.params.url_key;
  if (!url_key) {
    return res.redirect("quizzes");
  }

  dbQuizzes
    .getResultsByUrl(url_key)
    .then((results) => {
      const templateVars = { results };
      res.render('results', templateVars);
    })
    .catch((e) => {
      console.error(e);
      res.render('results');
    });
});


module.exports = router;
