module.exports = mongoose => {
    const Company = mongoose.model(
        "company",
        mongoose.Schema(
            {
                company_id: Number,
                companyName: String,
                industry: String,
                companySize: String,
                headquarters: String,
                foundedYear: Number,
                remoteFriendly: Boolean,
            },
            { timestamps: true }
        )
    );
    return Company;
};