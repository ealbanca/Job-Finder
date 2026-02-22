const db =require('../models');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Company = db.Company;

// Get all companies
getAllCompanies = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db().collection('companies').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        next(err);
    }
}

// Get a company by ID
getCompanyById = async (req, res, next) =>{
    const companyId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db().collection('companies').find({ _id: companyId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        next(err);
    }
}

// Create a new company
createCompany = async (req, res, next) => {
    const company = {
        companyName: req.body.companyName,
        industry: req.body.industry,
        companySize: req.body.companySize,
        headquarters: req.body.headquarters,
        foundedYear: req.body.foundedYear,
        remoteFriendly: req.body.remoteFriendly
    };
    try {
        const response = await mongodb.getDb().db().collection('companies').insertOne(company);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            const error = new Error(response.error || 'Some error occurred while creating the company.');
            error.status = 500;
            next(error);
        }
    } catch (err) {
        next(err);
    }
}

// Update a company by ID
updateCompanyById = async (req, res, next) =>{
    const companyId = new ObjectId(req.params.id);
    const updatedCompany = {
        companyName: req.body.companyName,
        industry: req.body.industry,
        companySize: req.body.companySize,
        headquarters: req.body.headquarters,
        foundedYear: req.body.foundedYear,
        remoteFriendly: req.body.remoteFriendly
    };
    try {
        const response = await mongodb.getDb().db().collection('companies').replaceOne({ _id: companyId }, updatedCompany);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            const error = new Error('Some error occurred while updating the company.');
            error.status = 500;
            next(error);
        }
    } catch (err) {
        next(err);
    }
}

// Delete a company by ID
deleteCompanyById = async (req, res, next) => {
    const companyId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('companies').deleteOne({ _id: companyId });
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            const error = new Error('Some error occurred while deleting the company.');
            error.status = 500;
            next(error);
        }
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompanyById,
    deleteCompanyById
};