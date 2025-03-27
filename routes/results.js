// Results & Score Sharing
// View my results
// Share my results

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
