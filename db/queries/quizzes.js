const db = require("../connection");

const getAllQuizzes = () => {
  const queryString =
    "SELECT quizzes.*, users.name as username FROM quizzes JOIN users ON users.id = owner_id WHERE quizzes.is_public = TRUE;";

  return db.query(queryString).then((result) => {
    return result.rows;
  });
};

const getLatestQuizzes = (limit = 7) => {
  const queryString =
    "SELECT * FROM quizzes WHERE is_public = TRUE ORDER BY id DESC  LIMIT $1;";
  const queryArgs = [limit];

  return db.query(queryString, queryArgs).then((result) => {
    return result.rows;
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

module.exports = { getAllQuizzes, getQuizById, getLatestQuizzes };
