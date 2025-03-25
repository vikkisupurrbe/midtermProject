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
  const queryString =
  `SELECT correct_answers, quizzes.id, quizzes.title, COUNT(questions.id) AS total_questions,
    CASE
    WHEN users.name IS NOT NULL THEN users.name
    WHEN results.name IS NOT NULL THEN results.name
    ELSE 'Results for anonymous user'
END AS name

   FROM results
   JOIN quizzes
   ON quizzes.id = quiz_id
   JOIN questions
   ON quizzes.id = questions.quiz_id
   LEFT JOIN users
   ON users.id = user_id
   WHERE url_key = $1
   GROUP BY 1, 2, 3, 5;
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
