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
const dbAttempts = require('../db/queries/attempts');
//const dbResults = require('../db/queries/results');


// Submit quiz answers
// router.post("/api/attempt/submit", (req, res) => {
//   res.status(200).json({ message: `Quiz ${req.params.quiz_id} submitted` });
// });


// router.get("/api/attempt/:quiz_id", (req, res) => {

//   res.status(200).json({ message: `attempt API` });
// });

router.post("/attempt/:quiz_id", (req, res) => {
  const quizId = req.params.quiz_id;
  const userAnswers = Object.values(req.body);
  let correctAnswers = 0;
  let url_key = 'random';

  //get user_id if logged in or input to write name conditional
  dbAttempts
    .getCorrectAnswers(quizId, userAnswers)
    .then((results) => {
      correctAnswers = results.count;
      //dbResults
      //crear un objeto {
      // quiz_id,
      // user_id,
      // name,
      // correct_answers,
      // url_key,
      //}
      // mandar llamar a createResults


      console.log('correct answers', correctAnswers);
      //res.send(results);
    })
    .catch((e) => {
      console.error(e);
    });

  return res.redirect(`/quizzes/results/${url_key}`); //example url just to redirect
});

router.get("/attempt/:quiz_id", (req, res) => {
  const quiz_id = req.params.quiz_id;
  if (!quiz_id) {
    return res.redirect("quizzes");
  }

  dbAttempts
    .getQuizTemplate(quiz_id)
    .then((results) => {
      const templateVars = { results };
      res.render('attempt', templateVars);
    })
    .catch((e) => {
      console.error(e);
    });
});


module.exports = router;
