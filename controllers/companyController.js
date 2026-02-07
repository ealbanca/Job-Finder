const db =require('../models');
const mongodb = require('../db/mongodb');
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
exports.getCompanyById = (req, res) =>{
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
exports.updateCompanyById = (req, res) =>{
}
