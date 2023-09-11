const Technique = require("../models/technique");

module.exports = {
  listTechniques,
  createTechnique,
  handleTechniqueCreation,
};

async function listTechniques(req, res) {
  try {
    const { isSubmission } = req.query;
    let query = {};

    if (isSubmission !== undefined) {
      query.isSubmission = isSubmission === 'true';
    }

    const techniques = await Technique.find(query);
    res.render('techniques/index', {
      title: "All Techniques",
      techniques,
      selectedIsSubmission: isSubmission || '', 
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}



async function handleTechniqueCreation(req, res) {
  try {
    
    const { name, position, isSubmission, description } = req.body;


    
    const technique = await Technique.create({
      name,
      position,
      isSubmission,
      description,
    });

    
    res.redirect("techniques");
  } catch (error) {
    
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function createTechnique(req, res) {
  res.render("techniques/new", {title: 'Create New Technique'} );
}


