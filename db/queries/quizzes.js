const db = require("../connection");

const getAllQuizzes = () => {
  return db.query("SELECT * FROM quizzes;").then((data) => {
    return data.rows;
  });
};

const getQuizById = function (id) {
  const queryString = `SELECT *
   FROM quizzes
   WHERE id = $1;
  `;
  const queryArgs = [id];

  return db
    .query(queryString, queryArgs)
    .then((result) => (result.rows.length > 0 ? result.rows[0] : null))
    .catch((err) => {
      console.log(err.message);
    });
};

const createResult = function (resultObj) {
  const queryString = `INSERT INTO results (quiz_id, user_id, total_questions, correct_answers, url_key)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *;
  `;
  const queryArgs = [
    resultObj.quiz_id,
    resultObj.user_id,
    resultObj.total_questions,
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

const getResultsByUrl = function (url_key) {
  const queryString = `SELECT users.name, total_questions, correct_answers, quizzes.title
   FROM results
   JOIN quizzes
   ON quizzes.id = quiz_id
   JOIN users
   ON users.id = user_id
   WHERE url_key = $1;
  `;
  const queryArgs = [url_key];

  return db
    .query(queryString, queryArgs)
    .then((result) => (result.rows.length > 0 ? result.rows[0] : null))
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getAllQuizzes, getQuizById, getResultsByUrl, createResult };
