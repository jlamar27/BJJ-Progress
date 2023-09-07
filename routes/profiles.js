const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles'); 

// Route to render the "Create Profile" page
router.get('/edit', profilesCtrl.renderEditProfilePage);

// Route to handle profile edit
router.post('/', profilesCtrl.editProfile);

// Route to display user profile
router.get('/:userId', profilesCtrl.displayProfile);

// Route to display techniques for user to add
router.get('/:userId/addTech', profilesCtrl.getTechniques);

// route to handle adding tech into user.techs
router.post('/:userId', profilesCtrl.addTechniques);




module.exports = router;
