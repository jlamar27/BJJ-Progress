// routes/profiles.js

const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles'); // Import the controller

// Route to render the "Create Profile" page
router.get('/new', profilesCtrl.renderCreateProfilePage);

// Route to handle profile creation
router.post('/', profilesCtrl.createProfile);

// Route to display user profile
router.get('/:userId', profilesCtrl.displayProfile);

// Add more routes and functionality as needed
module.exports = router;
