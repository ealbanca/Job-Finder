const db = require('../models');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Job = db.Job;

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('jobs').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

// Get a job by ID
exports.getJobById = (req, res) =>{
    const jobId = req.params.id;
    try {
        const result = mongodb.getDb().db().collection('jobs').find({ _id: new ObjectId(jobId) });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

// Create a new job
exports.createJob = async (req, res) => {
    const job = {
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        description: req.body.description,
        yearSalary: req.body.yearSalary,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        remote: req.body.remote,
        employmentType: req.body.employmentType,
        experienceLevel: req.body.experienceLevel
    };
    try {
        const response = await mongodb.getDb().db().collection('jobs').insertOne(job);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the job.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a job by ID
exports.updateJobById = (req, res) =>{
}

