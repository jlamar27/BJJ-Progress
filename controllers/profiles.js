const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const Technique = require("../models/technique");
const technique = require('../models/technique');



module.exports = {
    renderEditProfilePage,
    displayProfile,
    editProfile,
    getTechniques,
    addTechniques,
    removeUserTechnique,
}

async function  renderEditProfilePage (req, res){
    try{
        const userId = req.user.id
        console.log('userId!!!!', userId)
        const userProfile = await User.findById(userId);
        console.log('userProfile!!!!!', userProfile)

        if (!userProfile){
            return res.status(404).send('User Profile not found')
        }

        res.render('profiles/edit', { userProfile })
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

async function editProfile(req, res) {
    try {
        // Extract user profile data from the request body
        const { name, age, beltRank, email, avatar } = req.body;

        // Assuming you have the Google ID in the session or from authentication
        const googleId = req.user.googleId; // Replace 'req.user.googleId' with the actual location of the Google ID in your session or authentication data

        // Find the existing user profile by Google ID
        const userProfile = await User.findOne({ googleId });

        if (!userProfile) {
            // Handle the case where the user profile doesn't exist
            return res.status(404).send('User Profile not found');
        }

        // Update the user profile with the new data
        userProfile.name = name;
        userProfile.age = age;
        userProfile.beltRank = beltRank;
        userProfile.email = email;
        userProfile.avatar = avatar;

        // Save the updated user profile to the database
        await userProfile.save();

        // Redirect to the updated profile's page or any other appropriate action
        res.redirect(`/profiles/${userProfile._id}`);
    } catch (error) {
        // Handle errors, e.g., log the error and send an error response
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}




async function displayProfile(req, res) {
    try {
        // Get the user ID from the route parameter
        const userId = req.params.userId;
        const userProfile = await User.findById(userId).populate("techniques");
       
        if (!userProfile) {
            return res.status(404).send('User profile not found');
        }

        // Render the user profile view with the retrieved user data
        res.render('profiles/', {userProfile});
    } catch (error) {
        // Handle any errors that occur during database interaction
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function getTechniques ( req, res) {
    try{
        const userId = req.params.userId;
        const techniques = await Technique.find({});
        
        res.render('profiles/addTech', { techniques });
    } catch (error) {
        // Handle any errors that occur during database interaction
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function addTechniques(req, res) {
    try {
      const userId = req.params.userId;
      console.log('its here User ID:           ', userId)
      console.log('req.body          ', req.body)

      const selectedTechniques = req.body.Technique;
      console.log('selectedTechniques:          ', selectedTechniques)
    
    
      const userProfile = await User.findById(userId);
      console.log('userprofile for add tech', userProfile)
  
      if (!userProfile) {
        return res.status(404).send('User Profile not found');
        }

    // Assuming selectedTechniques is an array of objects, you can push them all at once
    userProfile.techniques.push(selectedTechniques);

    await userProfile.save();
    res.redirect(`/profiles/${userProfile._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Errorssss');
  }
}

async function removeUserTechnique (req, res) {
    try {
        const userId = req.params.userId;
        console.log('lolol',userId)
        const techniqueId = req.params.techniqueId;
        console.log('techid', techniqueId)
        const userProfile = await User.findById(userId)

        const techniqueIndex = userProfile.techniques.findIndex(
            (technique) => technique._id.toString() === techniqueId
          );
          


        userProfile.techniques.splice(techniqueIndex,1)

        await userProfile.save()

        res.redirect(`/profiles/${userId}`)

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error1');
      }
}