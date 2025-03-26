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
const dbCreateNewQuiz = require('../db/queries/createNewQuiz');

// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if (!res.locals.user) {
    return res.redirect('/users/login');
  }
  next();
};

// Display form for a new quiz
router.get("/new", requireLogin, (req, res) => {
  res.render('quiz_new', {
    user: res.locals.user
  });
});

// Create a new quiz
router.post("/", requireLogin, (req, res) => {
  // Restructure form data to match expected format
  const quizData = {
    title: req.body.title,
    description: req.body.description || '',
    isPublic: req.body.isPublic === 'on',
    questions: []
  };

  // Process questions from form submission
  if (req.body.questions) {
    Object.values(req.body.questions).forEach(questionData => {
      // Ensure answers are there
      if (questionData.answers) {
        const processedAnswers = questionData.answers.map((answer, index) => ({
          text: answer.text,
          isCorrect: questionData.correctAnswer === `${index}`
        }));

        quizData.questions.push({
          text: questionData.text,
          answers: processedAnswers
        });
      }
    });
  }

  try {
    // Validate quiz data
    dbCreateNewQuiz.validateQuizData(quizData);

    // Create quiz using the logged-in user's ID
    dbCreateNewQuiz.createQuiz(res.locals.user.id, quizData)
      .then(quizId => {
        console.log("=================New quiz created");
        // Redirect to the newly created quiz
        res.redirect(`/quizzes/${quizId}`);
      })
      .catch(error => {
        console.error('Quiz creation error:', error);
        // Render the form again with error message
        res.render('quiz_new', {
          user: res.locals.user,
          error: 'Failed to create quiz: ' + error.message
        });
      });
  } catch (validationError) {
    // Render the form again with validation error
    res.render('quiz_new', {
      user: res.locals.user,
      error: validationError.message
    });
  }
});

module.exports = router;