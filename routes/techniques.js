const express = require('express')
const router = express.Router()
const techniquesCtrl = require('../controllers/techniques')
const ensureLoggedIn = require('../config/ensureLoggedIn');



router.get('/', techniquesCtrl.listTechniques);





router.get('/new', ensureLoggedIn, techniquesCtrl.createTechnique)








router.post('/', ensureLoggedIn, techniquesCtrl.handleTechniqueCreation);



module.exports = router;
