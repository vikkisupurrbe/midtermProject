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
const db = require('../db');

// Get results for a quiz
router.get("quizzes/:quiz_id/results", (req, res) => {
  res.status(200).json({ message: `Results for quiz ${req.params.quiz_id}` });
});

// Get a specific quiz result by result_id, also for sharing
router.get("quizzes/:quiz_id/results/:result_id", (req, res) => {
  res.status(200).json({ message: `Result ${req.params.result_id} for quiz ${req.params.quiz_id}` });
});

module.exports = router;