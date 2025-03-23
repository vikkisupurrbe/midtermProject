const db = require("../connection");

const getAllQuizzes = () => {
  return db.query("SELECT * FROM quizzes;").then((data) => {
    return data.rows;
  });
};

const getQuizzById = (id) => {
  const queryString = `
    SELECT *
    FROM quizzes
    WHERE quizzes.id = $1;
  `;
  const queryParams = [id];

  return db.query(queryString, queryParams).then((res) => {
    return res.rows[0];
  });
};

module.exports = { getAllQuizzes, getQuizzById };
