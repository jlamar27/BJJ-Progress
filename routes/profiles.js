const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles'); 
const ensureLoggedIn = require('../config/ensureLoggedIn');


// Route to render the "Create Profile" page
router.get('/edit', ensureLoggedIn, profilesCtrl.renderEditProfilePage);

// Route to handle profile edit
router.post('/', ensureLoggedIn, profilesCtrl.editProfile);

// Route to display user profile
router.get('/:userId', ensureLoggedIn, profilesCtrl.displayProfile);

// Route to display techniques for user to add
router.get('/:userId/addTech', ensureLoggedIn, profilesCtrl.getTechniques);

// route to handle adding tech into user.techs
router.post('/:userId', ensureLoggedIn, profilesCtrl.addEditTechniques);




module.exports = router;
