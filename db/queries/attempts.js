const db = require('../connection');

const getQuizTemplate = function(quizId) {
  const queryString =
  `SELECT json_build_object(
  'quiz_id', quizzes.id,
  'quiz_title', quizzes.title,
  'quiz_description', quizzes.description,
  'questions', (
    SELECT json_agg(
      json_build_object(
        'question_id', questions.id,
        'question_text', questions.question_text,
        'answers', (
          SELECT json_agg(
            json_build_object(
              'answer_id', answers.id,
              'answer_text', answers.answer_text,
              'is_correct', answers.is_correct
            )
          )
          FROM answers
          WHERE answers.question_id = questions.id
        )
      )
    )
    FROM questions
    WHERE questions.quiz_id = quizzes.id
  )
) AS quiz_data
FROM quizzes
WHERE quizzes.id = $1;
`;
  const queryArgs = [quizId];

  return db
    .query(queryString, queryArgs)
    .then((result) => result.rows.length > 0 ?
      result.rows[0] : null)
    .catch((err) => {
      console.log(err.message);
    });
};

const getCorrectAnswers = function(quiz_id, userAnswers) {
  const queryString =
  `SELECT COUNT(*)
  FROM answers
  JOIN questions
  ON questions.id = question_id
  WHERE is_correct = TRUE
  AND quiz_id = $1
  AND answers.id = ANY ($2::int[]);
`;

  const queryArgs = [quiz_id, userAnswers];

  return db
    .query(queryString, queryArgs)
    .then((result) => result.rows[0] || { count: 0 }) // Ensure we return a valid count
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getQuizTemplate, getCorrectAnswers };
