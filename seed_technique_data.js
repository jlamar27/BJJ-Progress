const mongoose = require('mongoose')
const Technique = require('./models/technique')
const techniqueData = require('./technique_data.json')
require('dotenv').config();
const db = require('./config/database');



async function seedTechniques() {
    try{
        await Technique.deleteMany({})
        console.log('Deleted all existing techniques')
        for (const techniqueObj of techniqueData){
           const { name, position, isSubmission, description } = techniqueObj

           const technique = new Technique({
            name,
            position,
            isSubmission,
            description
           })
           
           await technique.save()
           console.log(`Seeded technique: ${technique.name}`)
        }

        mongoose.connection.close()
    } catch (error) {
        console.error('Error seeding techniques:', error)
        mongoose.connection.close()
    }
}


seedTechniques()