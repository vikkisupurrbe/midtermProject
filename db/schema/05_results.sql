-- Drop and recreate Results table

DROP TABLE IF EXISTS results CASCADE;

CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id INTEGER,
  name VARCHAR(255),
  correct_answers SMALLINT NOT NULL,
  url_key VARCHAR(255)
);
