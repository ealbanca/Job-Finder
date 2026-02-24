const db = require('../models');
const Job = db.Job;
const mongoose = require('mongoose');

// Get all jobs
getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jobs);
    } catch (err) {
        next(err);
    }
}

// Get a job by ID
getJobById = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(job);
    } catch (err) {
        next(err);
    }
};

// Create a new job
createJob = async (req, res, next) => {
    try {
        const job = new Job({
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
        });
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (err) {
        next(err);
    }
};

// Update a job by ID
updateJobById = async (req, res, next) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            {
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
            },
            { new: true, runValidators: true }
        );
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(updatedJob);
    } catch (err) {
        next(err);
    }
}

// Delete a job by ID
deleteJobById = async (req, res, next) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllJobs,
    getJobById, 
    createJob,
    updateJobById,
    deleteJobById
};

