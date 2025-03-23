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

// Submit quiz answers
router.post("/:quiz_id/submit", (req, res) => {
  res.status(200).json({ message: `Quiz ${req.params.quiz_id} submitted` });
});

module.exports = router;