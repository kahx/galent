const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    companyCity:{
        type: String,
        required: true
    },
    companyLogo:{
        type: String,
        required: true
    },
    companyMail:{
        type:String
    },
    jobTitle: {
        type:String,
        required: true
    },
    jobBody:{
        type:String,
        required: true
    },
    jobLink:{
        type:String,
        required: true
    }
});


mongoose.model('Jobs', jobsSchema);