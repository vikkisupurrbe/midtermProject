-- Drop and recreate Questions table

DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL
);
