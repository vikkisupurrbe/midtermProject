// User login, logout - Vikki
// Log in
// Log out
// Get current logged-in user info

const express = require('express');
const router  = express.Router();
const dbUsers = require('../db/queries/users');

// Serve the login page
router.get('/login', (req, res) => {
  res.render("login", { 
    error: null,  // Default to null
    user: null    // Default to null
  });
});

// Log in an existing user
router.post('/login', (req, res) => {
  const { email } = req.body;
  
  // Validate email
  if (!email) {
    return res.status(403).render("login", { 
      error: "Email is required",
      user: null 
    });
  }

  dbUsers.getUserWithEmail(email)
    .then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).render("login", { 
          error: "No user with that email",
          user: null 
        });
      }

      req.session.userId = user.id; // Store user id in session
      res.redirect('/');
    })
    .catch(err => {
      // Handle any database or server errors
      console.error("Login error:", err);
      return res.status(500).render("login", { 
        error: "Server error",
        user: null 
      });
    });
});

// Log out
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;