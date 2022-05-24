const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    birthdate : {
        type: String,
    },
    phone: {
        type: String,
    },
    city:{
        type: String,
    },
    gender: {
        type: String,
    },
    experience: [{
        companyName: {
            type: String
        },
        jobTitle: {
            type: String
        },
        startingDate: {
            type: String
        },
        finishingDate: {
            type: String
        }
    }],
    education: [{
        uniName: {
            type: String
        },
        departmentName: {
            type: String
        },
        startingDate: {
            type: String
        },
        finishingDate: {
            type: String
        },
        eduType:{
            type:String
        },
        eduLang:{
            type:String
        },
        scholarship:{
            type:String
        }
    }],
    portfolio:{
        type: String,
    },
    skills:{
        type:String
    }
})

const resumeSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sections: [sectionSchema]
});

mongoose.model('Resume', resumeSchema);