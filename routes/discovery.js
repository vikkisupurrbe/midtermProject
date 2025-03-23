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

const express = require('express');
const router  = express.Router();

// Get a list of public quizzes
router.get("/", (req, res) => {
  res.status(200).json({ message: "List of public quizzes" });
});

// Get public quizzes for the homepage
router.get("/public", (req, res) => {
  res.status(200).json({ message: "Homepage public quizzes" });
});

// Get a specific quiz by ID
router.get("/:quiz_id", (req, res) => {
  res.status(200).json({ message: `Quiz ${req.params.quiz_id} details...` });
});

module.exports = router;
