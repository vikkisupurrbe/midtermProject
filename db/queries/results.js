const db = require("../connection");


// Helper function to store results
const createResult = function(resultObj) {
  const queryString = `INSERT INTO results (quiz_id, user_id, name, correct_answers, url_key)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *;
  `;
  const queryArgs = [
    resultObj.quiz_id,
    resultObj.user_id,
    resultObj.name,
    resultObj.correct_answers,
    resultObj.url_key,
  ];

  return db
    .query(queryString, queryArgs)
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};

// Helper function to retrieve results by URL key
const getResultsByUrl = function(url_key) {
  const queryString = `
  SELECT
    results.correct_answers,
    quizzes.id AS quiz_id,
    quizzes.title,
    COUNT(questions.id) AS total_questions,
    COALESCE(users.name, results.name) AS name  -- Uses users.name if available, otherwise results.name
  FROM results
  JOIN quizzes ON quizzes.id = results.quiz_id
  JOIN questions ON quizzes.id = questions.quiz_id
  LEFT JOIN users ON users.id = results.user_id
  WHERE results.url_key = $1
  GROUP BY results.correct_answers, quizzes.id, quizzes.title, users.name, results.name;
  `;

  const queryArgs = [url_key];

  return db
    .query(queryString, queryArgs)
    .then((result) => (result.rows.length > 0 ? result.rows[0] : null))
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getResultsByUrl, createResult };
