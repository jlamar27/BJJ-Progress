const { default: mongoose } = require('mongoose');
const User = require('../models/user');


module.exports = {
    renderEditProfilePage,
    displayProfile,
    editProfile,
}

async function  renderEditProfilePage (req, res){
    res.render('profiles/edit')
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
        // Fetch the user profile data from the database based on the user ID
        const userProfile = await User.findById(userId);

        if (!userProfile) {
            // Handle the case where the user profile doesn't exist
            return res.status(404).send('User profile not found');
        }

        // Render the user profile view with the retrieved user data
        res.render('profiles/', { userProfile });
    } catch (error) {
        // Handle any errors that occur during database interaction
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

