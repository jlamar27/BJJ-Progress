const express = require('express')
const router = express.Router()
const techniquesCtrl = require('../controllers/techniques')
const ensureLoggedIn = require('../config/ensureLoggedIn');


// Route to display a list of techniques
router.get('/', techniquesCtrl.listTechniques);

// // Route to display an individual technique
// router.get('/:techniqueId', techniquesCtrl.viewTechnique);

// Route to add a new technique
router.get('/new', ensureLoggedIn, techniquesCtrl.createTechnique)

// // Route to edit an existing technique
// router.get('/:techniqueId/edit', techniquesCtrl.editTechnique);

// // Route to update an existing technique
// router.put('/:techniqueId', techniquesCtrl.updateTechnique);

// // Route to handle form submission for creating a new technique
router.post('/', ensureLoggedIn, techniquesCtrl.handleTechniqueCreation);



module.exports = router;
