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
router.post("/api/attempt/submit", (req, res) => {
  res.status(200).json({ message: `Quiz ${req.params.quiz_id} submitted` });
});


router.get("/api/attempt/:quiz_id", (req, res) => {

  res.status(200).json({ message: `attempt API` });
});

router.get("/attempt/:quiz_id", (req, res) => {

  res.render('attempt');
});


module.exports = router;
