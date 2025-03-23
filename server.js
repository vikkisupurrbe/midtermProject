// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const quizRoutes = require('./routes/quizzes');   // Quiz creation & management (Vikki)
const discoveryRoutes = require('./routes/discovery');  // Quiz listing & sharing (Jumpei)
const attemptRoutes = require('./routes/attempts');    // Quiz attempts (Ale)
const resultsRoutes = require('./routes/results');    // Quiz results (Ale)

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// Note: Routes are prefixed with /quizzes
app.use('/quizzes', quizRoutes);  
app.use('/quizzes', discoveryRoutes);
app.use('/quizzes', attemptRoutes);
app.use('/quizzes', resultsRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
