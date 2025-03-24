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
const { getQuizById } = require("../db/queries/quizzes");
const router = express.Router();

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
router.get("/", (req, res) => {
  res.render("index");
});

// Get a list of public quizzes
router.get("/quizzes", (req, res) => {
  res.status(200).json({ message: "List of public quizzes" });
});

// Get a specific quiz by ID
router.get("/quizzes/:quiz_id", (req, res) => {
  const quiz_id = req.params.quiz_id;
  return getQuizById(quiz_id).then((result) => {
    const templateVars = result;
    return res.render("quiz", templateVars);
  });
});

module.exports = router;
