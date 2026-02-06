module.exports = mongoose => {
    const Job = mongoose.model(
        "job",
        mongoose.Schema(
            {
                job_id: Number,
                jobTitle: String,
                companyName: String,
                description: String,
                yearSalary: Number,
                country: String,
                state: String,
                city: String,
                remote: Boolean,
                employmentType: String,
                experienceLevel: String
            },
            { timestamps: true }
        )
    );
    return Job;
};