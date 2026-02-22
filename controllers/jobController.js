const db = require('../models');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Job = db.Job;

// Get all jobs
exports.getAllJobs = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db().collection('jobs').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        next(err);
    }
}

// Get a job by ID
exports.getJobById = async (req, res, next) => {
    const jobId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db().collection('jobs').find({ _id: jobId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        next(err);
    }
};

// Create a new job
exports.createJob = async (req, res, next) => {
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
            const error = new Error('Some error occurred while creating the job.');
            error.status = 500;
            next(error);
        }
    } catch (err) {
        next(err);
    }
};

// Update a job by ID
exports.updateJobById = async (req, res, next) => {
    const jobId = new ObjectId(req.params.id);
    const updatedJob = {
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
        const response = await mongodb.getDb().db().collection('jobs').replaceOne({ _id: jobId }, updatedJob);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            const error = new Error('Some error occurred while updating the job.');
            error.status = 500;
            next(error);
        }
    } catch (err) {
        next(err);
    }
}

// Delete a job by ID
exports.deleteJobById = async (req, res, next) => {
    const jobId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('jobs').deleteOne({ _id: jobId });
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            const error = new Error('Some error occurred while deleting the job.');
            error.status = 500;
            next(error);
        }
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

