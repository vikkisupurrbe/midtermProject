// Quiz Creation & Management - Vikki
// Create a quiz
// Make a quiz unlisted (at the time of creation)

/* Remember to create your feature branch before starting 
  git command:
  ~ git checkout -b feature/quiz-creation-vikki 
    (create and switch to a new branch)
  ~ git branch 
    (gives feature/quiz-creation-vikki)
  ~ git push origin feature/quiz-creation-vikki
*/

const express = require('express');
const router  = express.Router();

// Create a new quiz
router.post("/new", (req, res) => {
  res.status(201).json({ message: "Quiz created!" });
});

// Display form for a new quiz
router.get("/new", (req, res) => {
  res.status(200).json({ message: "Quiz creation form" });
});

module.exports = router;