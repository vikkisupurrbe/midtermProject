// Quiz Discovery & Access - Jumpei
// View public quizzes
// View public quizzes on the home page
// Share a quiz

/* Remember to create your feature branch before starting
  git command:
  ~ git checkout -b feature/quiz-discovery-jumpei
    (create and switch to a new branch)
  ~ git branch
    (gives feature/quiz-discovery-jumpei)
  ~ git push origin feature/quiz-discovery-jumpei
*/

const express = require("express");
const {
  getQuizById,
  getAllQuizzes,
  getLatestQuizzes,
} = require("../db/queries/quizzes");
const router = express.Router();

// Home page
router.get("/", (req, res) => {
  return getLatestQuizzes().then((result) => {
    const templateVars = { result };
    return res.render("index", templateVars);
  });
});

// Get a list of public quizzes
router.get("/quizzes", (req, res) => {
  return getAllQuizzes().then((result) => {
    const templateVars = { result };
    return res.render("quizzes", templateVars);
  });
});

// Get a specific quiz by ID
router.get("/quizzes/:quiz_id", (req, res) => {
  const quiz_id = req.params.quiz_id;
  return res.redirect(`/quizzes/attempt/${quiz_id}`);
});

module.exports = router;
