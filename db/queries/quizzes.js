const db = require('../connection');

const getQuizById = function(id) {
  const queryString =
  `SELECT *
   FROM quizzes
   WHERE id = $1;
  `;
  const queryArgs = [id];

  return db
    .query(queryString, queryArgs)
    .then((result) => result.rows.length > 0 ?
      result.rows[0] : null)
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getQuizById };
