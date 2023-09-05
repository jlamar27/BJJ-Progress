// routes/profiles.js

const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles'); // Import the controller

// Route to render the "Create Profile" page
router.get('/edit', profilesCtrl.renderEditProfilePage);

// Route to handle profile edit
router.post('/', profilesCtrl.editProfile);

// Route to display user profile
router.get('/:userId', profilesCtrl.displayProfile);

// // Route to edit user profile
// router.patch('/:userId', profilesCtrl.editProfile)

// Add more routes and functionality as needed
module.exports = router;
