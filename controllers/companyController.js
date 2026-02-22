const db =require('../models');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Company = db.Company;

// Get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('companies').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
}

// Get a company by ID
exports.getCompanyById = async (req, res) =>{
    const companyId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db().collection('companies').find({ _id: companyId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Create a new company
exports.createCompany = async (req, res) => {

        const company = {
            companyName: req.body.companyName,
            industry: req.body.industry,
            companySize: req.body.companySize,
            headquarters: req.body.headquarters,
            foundedYear: req.body.foundedYear,
            remoteFriendly: req.body.remoteFriendly
        };
        const response = await mongodb.getDb().db().collection('companies').insertOne(company);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the company.');
        }
}

// Update a company by ID
exports.updateCompanyById = async (req, res) =>{
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
            res.status(500).json({ message: 'Some error occurred while updating the company.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete a company by ID
exports.deleteCompanyById = async (req, res) => {
    const companyId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('companies').deleteOne({ _id: companyId });
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the company.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
