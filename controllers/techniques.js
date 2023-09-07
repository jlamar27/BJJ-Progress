const Technique = require("../models/technique");

module.exports = {
  listTechniques,
  createTechnique,
  handleTechniqueCreation,
};

async function listTechniques(req, res) {
  try {
    // Fetch all techniques from the database (you may need to adjust this query)
    const techniques = await Technique.find({});
    console.log('here12', techniques)
    // Render the techniques view and pass the techniques array to it
    // res.render('profiles/addTech', { data: techniques })
    res.render('techniques/index', { title: "All Techniques", techniques });
  } catch (error) {
    // Handle errors, e.g., log the error and send an error response
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function handleTechniqueCreation(req, res) {
  try {
    // Extract technique data from the request body
    const { name, position, isSubmission, description } = req.body;


    // Create a new technique using the Technique model
    const technique = await Technique.create({
      name,
      position,
      isSubmission,
      description,
    });

    // Redirect to a page or route where you want to display all techniques
    res.redirect("techniques");
  } catch (error) {
    // Handle errors, e.g., log the error and send an error response
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function createTechnique(req, res) {
  res.render("techniques/new", {title: 'Create New Technique'} );
}


