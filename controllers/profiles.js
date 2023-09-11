const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const Technique = require("../models/technique");
const TrainingSession = require('../models/trainingSession');
const user = require('../models/user');




module.exports = {
    renderEditProfilePage,
    displayProfile,
    editProfile,
    getTechniques,
    addTechniques,
    removeUserTechnique,
    renderTrainingSessionPage,
    createTrainingSession,
    renderUserTrainingSessionsPage,
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
        
        const { name, age, beltRank, email, avatar } = req.body;

        
        const googleId = req.user.googleId; 

        
        const userProfile = await User.findOne({ googleId });

        if (!userProfile) {
            
            return res.status(404).send('User Profile not found');
        }

        
        userProfile.name = name;
        userProfile.age = age;
        userProfile.beltRank = beltRank;
        userProfile.email = email;
        userProfile.avatar = avatar;

        
        await userProfile.save();

        
        res.redirect(`/profiles/${userProfile._id}`);
    } catch (error) {
        
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}




async function displayProfile(req, res) {
    try {
        
        const userId = req.params.userId;
        const userProfile = await User.findById(userId).populate("techniques");
       
        if (!userProfile) {
            return res.status(404).send('User profile not found');
        }

        const trainingSessions = await TrainingSession.find({ _id: { $in: userProfile.trainingSessions } });


        res.render('profiles/', {
            userProfile,
            trainingSessions
        });

    } catch (error) {
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
        
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function addTechniques(req, res) {
    try {
      const userId = req.params.userId;
      console.log('its here User ID:', userId)
      console.log('req.body', req.body)

      const selectedTechniques = req.body.Technique;
      console.log('selectedTechniques:          ', selectedTechniques)
    
    
      const userProfile = await User.findById(userId);
      console.log('userprofile for add tech', userProfile)
  
      if (!userProfile) {
        return res.status(404).send('User Profile not found');
        }

    
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
        res.status(500).send('Internal Server Error');
      }
}

async function renderTrainingSessionPage (req, res){
    try{
        const userId = req.params.userId
        const userProfile = await User.findById(userId).populate('techniques')

        if (!userProfile) {
            return res.status(404).send('User profile not found')
        }

        res.render('profiles/trainingSession', {
            userProfile,
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

async function createTrainingSession(req, res) {
    try{
        const { date, techniquesUsed, journal}  = req.body

        const userId = req.params.userId

        const trainingSession = new TrainingSession({
            date,
            techniquesUsed,
            journal,
        })

        await trainingSession.save()
        console.log(trainingSession)
    
        const userProfile = await User.findById(userId)

        userProfile.trainingSessions.push(trainingSession);

        await userProfile.save();

        res.redirect(`/profiles/${userId}`);


    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');

    }
}


async function renderUserTrainingSessionsPage(req, res) {
    try {
        const userId = req.params.userId;

        
        const userProfile = await User.findById(userId);
        if (!userProfile) {
            return res.status(404).send('User Profile not found');
        }

        
        const trainingSessions = await TrainingSession.find({ user: userId });
        console.log('juan', trainingSessions)
        res.render('profiles/userTrainingSessions', {
            userProfile,
            trainingSessions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
