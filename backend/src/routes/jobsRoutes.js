const express = require('express');
const mongoose = require('mongoose');

const Jobs = mongoose.model('Jobs');

const router = express.Router();

router.get('/jobs', async (req,res) => {
    if(req.query.id == undefined){
        const jobs = await Jobs.find({});
        res.send(jobs);
    }else{
        const job = await Jobs.findById(req.query.id);
        res.send(job);
    }
});

router.post('/jobs', async (req,res) => {
    const {companyName, companyCity, companyLogo, companyMail, jobTitle, jobBody, jobLink} = req.body;
    try {
        const job = new Jobs({companyName, companyCity, companyLogo, companyMail, jobTitle, jobBody, jobLink});
        await job.save();
        res.send(job);
    } catch (error) {
        res.status(422).send({err: error.message});
    }
    
});

module.exports = router;