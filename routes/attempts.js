// Taking a Quiz - Ale
// Submit a quiz

/* Remember to create your feature branch before starting
  git command:
  ~ git checkout -b feature/quiz-attempt-ale
    (create and switch to a new branch)
  ~ git branch
    (gives feature/quiz-attempt-ale)
  ~ git push origin feature/quiz-attempt-ale
*/

const express = require('express');
const router  = express.Router();
const dbQuizzes = require('../db/queries/attempts');

// Submit quiz answers
// router.post("/api/attempt/submit", (req, res) => {
//   res.status(200).json({ message: `Quiz ${req.params.quiz_id} submitted` });
// });


// router.get("/api/attempt/:quiz_id", (req, res) => {

//   res.status(200).json({ message: `attempt API` });
// });

router.post("/attempt/:quiz_id", (req, res) => {
  return res.redirect('/quizzes/results/vWxYz1a2b3'); //example url just to redirect
});

router.get("/attempt/:quiz_id", (req, res) => {
  const quiz_id = req.params.quiz_id;
  if (!quiz_id) {
    return res.redirect("quizzes");
  }

  dbQuizzes
    .getQuizTemplate(quiz_id)
    .then((results) => {
      const templateVars = { results };
      //res.send(results);
      res.render('attempt', templateVars);
    })
    .catch((e) => {
      console.error(e);
    });
});


module.exports = router;
