// Taking a Quiz
// Submit a quiz

const express = require('express');
const router  = express.Router();
const dbAttempts = require('../db/queries/attempts');
const { nanoid } = require('nanoid');
const dbResults = require('../db/queries/results');



router.post("/attempt/:quiz_id", (req, res) => {
  const quizId = req.params.quiz_id;
  const userAnswers = Object.values(req.body);
  let correctAnswers = 0;
  let url_key = nanoid(10);

  let userId = null;
  let userName = req.body.name || "Anonymous";
  if (req.session && req.session.userId) {
    userId = req.session.userId; // use session cookie if the user is logged in
    userName = null; // ff logged in, don't store their name manually
  }

  //get user_id if logged in or input to write name conditional
  dbAttempts.getCorrectAnswers(quizId, userAnswers)
    .then((results) => {
      correctAnswers = results.count; //change number based on answers

      // insert a result in the db
      const resultObj = {
        quiz_id: quizId,
        user_id: userId, // user_id if available
        name: userName,  // name if user_id is null
        correct_answers: correctAnswers,
        url_key: url_key
      };

      return dbResults.createResult(resultObj);
    })
    .then(() => {
      // redirect to the results page after saving the attempt
      res.redirect(`/quizzes/results/${url_key}`);
    })
    .catch((e) => {
      console.error(e);
      res.redirect("/quizzes"); // redirect if an error occurs
    });
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
