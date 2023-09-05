const User = require('../models/user');


module.exports = {
    renderCreateProfilePage,
    createProfile,
    displayProfile
}

async function  renderCreateProfilePage (req, res){
    res.render('profiles/create')
}

async function  createProfile (req, res){
    try {
        // Extract user profile data from the request body
        const { name, age, beltRank, email, avatar } = req.body;

        // Assuming you have the Google ID in the session or from authentication
        const googleId = req.user.googleId; // Replace 'req.user.googleId' with the actual location of the Google ID in your session or authentication data

        // Create a new user profile using the User model
        const userProfile = new User({
            name,
            age,
            beltRank,
            googleId,
            email,
            avatar,
        });

        // Save the new user profile to the database
        await userProfile.save();

        // Redirect to the newly created profile's page or any other appropriate action
        res.redirect(`/profiles/${userProfile._id}`);
    } catch (error) {
        // Handle errors, e.g., log the error and send an error response
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



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
