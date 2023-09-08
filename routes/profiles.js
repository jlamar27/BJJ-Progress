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
router.post('/:userId', ensureLoggedIn, profilesCtrl.addTechniques);

// technique removal from users technique 
router.get('/:userId/removeTech/:techniqueId', ensureLoggedIn, profilesCtrl.removeUserTechnique)

// Route to create a new training session
router.get('/:userId/trainingSession', ensureLoggedIn, profilesCtrl.renderTrainingSessionPage);

// Route to handle creating training session for user
router.post('/:userId/createTrainingSession', ensureLoggedIn, profilesCtrl.createTrainingSession);


// // Route to display a specific training session
router.get('/:userId/sessions/:sessionId', ensureLoggedIn, profilesCtrl.displayTrainingSession);

// // Route to add techniques used in a training session
// router.post('/:userId/sessions/:sessionId/addTechniques', ensureLoggedIn, profilesCtrl.addTechniquesToSession);



module.exports = router;
