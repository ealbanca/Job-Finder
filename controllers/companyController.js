const db = require('../models');
const Company = db.Company;
const mongoose = require('mongoose');

// Get all companies
getAllCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(companies);
    } catch (err) {
        next(err);
    }
}

// Get a company by ID
getCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(company);
    } catch (err) {
        next(err);
    }
}

// Create a new company
createCompany = async (req, res, next) => {
    try {
        const company = new Company({
            companyName: req.body.companyName,
            industry: req.body.industry,
            companySize: req.body.companySize,
            headquarters: req.body.headquarters,
            foundedYear: req.body.foundedYear,
            remoteFriendly: req.body.remoteFriendly
        });
        const savedCompany = await company.save();
        res.status(201).json(savedCompany);
    } catch (err) {
        next(err);
    }
}

// Update a company by ID
updateCompanyById = async (req, res, next) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            {
                companyName: req.body.companyName,
                industry: req.body.industry,
                companySize: req.body.companySize,
                headquarters: req.body.headquarters,
                foundedYear: req.body.foundedYear,
                remoteFriendly: req.body.remoteFriendly
            },
            { new: true, runValidators: true }
        );
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(updatedCompany);
    } catch (err) {
        next(err);
    }
}

// Delete a company by ID
deleteCompanyById = async (req, res, next) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(req.params.id);
        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully' });
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