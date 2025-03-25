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
  console.log('Login Request Body:', req.body);
  console.log('Current Session:', req.session);
  const { email } = req.body;
  if (!email) {
    return res.render("login", { 
      error: "Email is required",
      user: null 
    }); 
  }

  dbUsers.getUserWithEmail(email)
    .then(user => {
      if (!user) {
        req.session = null;
        return res.render("login", { 
          error: "No user with that email",
          user: null 
        });
      }

      req.session.userId = user.id; // Store user id in session
      console.log('Session after login:', req.session);
      res.redirect('/me');
    })
    .catch (err => {
      console.error("Login error:", err);
      res.render("login", { 
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

// Get current logged in user info
router.get('/me', (req, res) => {
  console.log('Current Session in /me:', req.session); // Add this line
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in"});
  }

  dbUsers.getUserById(req.session.userId)
    .then(user => {
      if (!user) {
        req.session = null;
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
    })
    .catch(err => {
      console.error("Error fetching current user:", err);
      res.status(500).json({ error: "Server error" });
    });
});

module.exports = router;