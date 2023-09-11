const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles'); 
const ensureLoggedIn = require('../config/ensureLoggedIn');



router.get('/edit', ensureLoggedIn, profilesCtrl.renderEditProfilePage);


router.post('/', ensureLoggedIn, profilesCtrl.editProfile);


router.get('/:userId', ensureLoggedIn, profilesCtrl.displayProfile);


router.get('/:userId/addTech', ensureLoggedIn, profilesCtrl.getTechniques);


router.post('/:userId', ensureLoggedIn, profilesCtrl.addTechniques);


router.get('/:userId/removeTech/:techniqueId', ensureLoggedIn, profilesCtrl.removeUserTechnique)


router.get('/:userId/trainingSession', ensureLoggedIn, profilesCtrl.renderTrainingSessionPage);


router.post('/:userId/createTrainingSession', ensureLoggedIn, profilesCtrl.createTrainingSession);


router.get('/:userId/sessions/:sessionId', ensureLoggedIn, profilesCtrl.renderUserTrainingSessionsPage);





module.exports = router;
