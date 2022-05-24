const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Resume = mongoose.model('Resume');

const router = express.Router();

router.use(requireAuth);

router.get('/resumes', requireAuth, async (req,res) => {
    const resumes = await Resume.find({userId: req.user._id});
    res.send(resumes);
});

router.post('/resumes', async (req,res) => {
    const {sections} = req.body;
    if(!sections){
        return res.status(422).send({error: "You must provide sections"});
    }
    try {
        const resume = new Resume({sections, userId: req.user._id});
        await resume.save();
        res.send(resume);
    } catch (error) {
        if(error.code == 11000){
            const section = Object.keys(error.keyValue)[0].replace('sections.', '');
            const sectionValue = Object.values(error.keyValue)[0];
            const filter = {userId : req.user._id};
            const update = {section: sectionValue};
            try {
                await Resume.findOneAndUpdate(filter,update, {runValidators: true, context:'query'})
            } catch (error) {
                res.status(422).send({err: error.message});
            }  
        }else{
            res.status(422).send({err: error.message});
        }
    }
    
});

module.exports = router;