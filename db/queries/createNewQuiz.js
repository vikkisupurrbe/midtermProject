const db = require("../connection");

const createQuiz = function (userID, quizData) {
  // Return a promise to handle the entire quiz creation
  return new Promise((resolve, reject) => {
    // Step 1: Insert quiz
    const quizInsertQuery = `
      INSERT INTO quizzes (owner_id, title, description, is_public)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    db.query(quizInsertQuery, [
      userID, 
      quizData.title, 
      quizData.description || '', 
      quizData.isPublic
    ])
    .then(quizResult => {
      // Extract the newly created quiz ID
      const quizId = quizResult.rows[0].id;

      // Step 2: Insert questions
      // Create an array of promises for question insertions
      const questionPromises = quizData.questions.map(question => {
        const questionInsertQuery = `
          INSERT INTO questions (quiz_id, question_text)
          VALUES ($1, $2)
          RETURNING *
        `;
        
        return db.query(questionInsertQuery, [quizId, question.text])
          .then(questionResult => {
            // Step 3: Insert answers for each question
            const questionId = questionResult.rows[0].id;
            
            // Create promises for answer insertions
            const answerPromises = question.answers.map(answer => {
              const answerInsertQuery = `
                INSERT INTO answers (question_id, answer_text, is_correct)
                VALUES ($1, $2, $3)
                RETURNING *
              `;
              
              return db.query(answerInsertQuery, [
                questionId, 
                answer.text, 
                answer.isCorrect
              ]);
            });
            
            // Wait for all answers to be inserted
            return Promise.all(answerPromises)
            .then(answerResults => {
              // answerResults will be an array of query results
              const answerIds = answerResults.map(result => result.rows[0].id);
              return answerIds;
            });
          });
      });

      // Step 4: Wait for all questions and their answers to be inserted
      return Promise.all(questionPromises)
        .then(() => {
          // Resolve with the quiz ID if everything succeeds
          resolve(quizId);
        });
    })
    .catch(error => {
      // Handle any errors during the process
      console.error('Error creating quiz:', error);
      reject(error);
    });
  });
};

// Validation function
const validateQuizData = (quizData) => {
  // Validate quiz title
  if (!quizData.title || quizData.title.trim() === '') {
    throw new Error('Quiz title is required');
  }

  // Validate number of questions (5 max)
  if (!quizData.questions || quizData.questions.length === 0 || quizData.questions.length > 5) {
    throw new Error('Quiz must have 1-5 questions');
  }

  // Validate each question
  quizData.questions.forEach((question, index) => {
    // Validate question text
    if (!question.text || question.text.trim() === '') {
      throw new Error(`Question ${index + 1} text is required`);
    }

    // Validate answers
    if (!question.answers || question.answers.length !== 4) {
      throw new Error(`Question ${index + 1} must have exactly 4 answers`);
    }

    // Ensure exactly one correct answer
    const correctAnswers = question.answers.filter(answer => answer.isCorrect);
    if (correctAnswers.length !== 1) {
      throw new Error(`Question ${index + 1} must have exactly one correct answer`);
    }

    // Validate answer texts
    question.answers.forEach((answer, answerIndex) => {
      if (!answer.text || answer.text.trim() === '') {
        throw new Error(`Answer ${answerIndex + 1} for Question ${index + 1} is required`);
      }
    });
  });
};


module.exports = { createQuiz, validateQuizData };